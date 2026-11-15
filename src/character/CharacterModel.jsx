import { useEffect, useMemo } from 'react';
import { useFrame, useLoader, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { rig } from './rig';

export const MODEL_PATH = '/models/avatar.glb';

const DEG = Math.PI / 180;
const FOV = 25; // keep in sync with the <Canvas camera> in Character.jsx
const VIEW_SLOPE = 2 * Math.tan((FOV * DEG) / 2); // visible height per unit distance
const MIN_VIEW_WIDTH = 0.8; // metres of scene that must fit across the screen

/* Where the relaxed arms should point, in the character's own space
   (x = outward from the body, y = up, z = forward). */
const UPPER_ARM_DIR = [0.17, -1, 0.02];
const FOREARM_DIR = [0.1, -1, 0.2];

/* Waving (right arm): upper arm out to the side, forearm upright and swinging
   between two angles, palm towards the viewer. Same axes as above. */
const WAVE_UPPER_DIR = [0.9, 0.05, 0.28];
const WAVE_FORE_A = [-0.3, 1, 0.22];
const WAVE_FORE_B = [0.32, 1, 0.22];

const { lerp, clamp, damp } = THREE.MathUtils;

const _e = new THREE.Euler();
const _q = new THREE.Quaternion();
const _dance = new THREE.Quaternion();
const _a = new THREE.Vector3();
const _b = new THREE.Vector3();

/** Neutral studio reflections, generated locally (no HDR download). */
function StudioEnvironment() {
  const gl = useThree((s) => s.gl);
  const scene = useThree((s) => s.scene);
  useEffect(() => {
    const pmrem = new THREE.PMREMGenerator(gl);
    const target = pmrem.fromScene(new RoomEnvironment(), 0.04);
    scene.environment = target.texture;
    scene.environmentIntensity = 0.55;
    return () => {
      scene.environment = null;
      target.dispose();
      pmrem.dispose();
    };
  }, [gl, scene]);
  return null;
}

/** Rotate `bone` so the segment bone→child points along `dir` (root space). */
function aimBone(root, bone, child, dir) {
  root.updateMatrixWorld(true);
  bone.getWorldPosition(_a);
  child.getWorldPosition(_b);
  const current = _b.sub(_a).normalize();
  const swing = new THREE.Quaternion().setFromUnitVectors(current, dir);
  const boneWorld = bone.getWorldQuaternion(new THREE.Quaternion());
  const parentWorld = bone.parent.getWorldQuaternion(new THREE.Quaternion());
  bone.quaternion.copy(parentWorld.invert().multiply(swing).multiply(boneWorld));
}

/**
 * Works out the skeleton from bone names, so any humanoid rig using Mixamo
 * (`mixamorig:LeftArm`) or 3ds Max Biped (`Bip01 L UpperArm`) naming works,
 * whatever its bind pose (T-pose or A-pose).
 */
export function buildRig(gltf) {
  const root = gltf.scene;
  root.rotation.set(0, 0, 0);
  root.updateMatrixWorld(true);

  const all = [];
  root.traverse((o) => {
    if (o.isBone) all.push(o);
    if (o.isMesh) {
      o.frustumCulled = false; // skinned bounds are unreliable
      const mats = Array.isArray(o.material) ? o.material : [o.material];
      // Smooth the cut-out edges of hair / lashes.
      mats.forEach((m) => {
        if (m.alphaTest > 0) m.alphaToCoverage = true;
      });
    }
  });
  const key = (bone) => bone.name.toLowerCase().replace(/[^a-z0-9]/g, '');
  const find = (re) => all.find((b) => re.test(key(b)));

  // Height drives the camera framing.
  const height = new THREE.Box3().setFromObject(root).max.y;

  // Bind-pose (open) hand, remembered before the fingers get curled below.
  const openHand = new Map(
    all.filter((b) => /righthand(index|middle|ring|pinky|thumb)\d$/.test(key(b))).map((b) => [b, b.quaternion.clone()])
  );

  // ---- Relaxed arms: aim each segment at a target direction ---------------
  [
    [/(leftarm|lupperarm)$/, /(leftforearm|lforearm|llowerarm)$/, /(lefthand|lhand)$/],
    [/(rightarm|rupperarm)$/, /(rightforearm|rforearm|rlowerarm)$/, /(righthand|rhand)$/],
  ].forEach(([upperRe, foreRe, handRe]) => {
    const upper = find(upperRe);
    const fore = find(foreRe);
    const hand = find(handRe);
    if (!upper || !fore || !hand) return;
    root.updateMatrixWorld(true);
    const out = Math.sign(fore.getWorldPosition(_a).x - upper.getWorldPosition(_b).x) || 1;
    const dir = ([x, y, z]) => new THREE.Vector3(x * out, y, z).normalize();
    aimBone(root, upper, fore, dir(UPPER_ARM_DIR));
    aimBone(root, fore, hand, dir(FOREARM_DIR));
  });

  // Mixamo hands are bound flat; give the fingers a natural curl.
  all.forEach((b) => {
    if (/hand(index|middle|ring|pinky)[123]$/.test(key(b))) {
      b.quaternion.multiply(_q.setFromEuler(_e.set(16 * DEG, 0, 0)));
    }
  });
  root.updateMatrixWorld(true);

  const wave = buildWavePose(root, find, key, openHand);

  // ---- Bones that get procedural motion, with their world-space frames -----
  const roles = {
    hips: find(/(hips|pelvis)$/),
    spine: find(/spine$/),
    spine1: find(/spine1$/),
    spine2: find(/spine2$/),
    neck: find(/neck$/),
    head: find(/head$/),
    armL: find(/(leftarm|lupperarm)$/),
    armR: find(/(rightarm|rupperarm)$/),
  };
  const roleOf = new Map(
    Object.entries(roles)
      .filter(([, b]) => b)
      .map(([r, b]) => [b, r])
  );

  const bones = all.map((bone) => {
    const parent = bone.parent.getWorldQuaternion(new THREE.Quaternion());
    return {
      bone,
      role: roleOf.get(bone) || null,
      idle: bone.quaternion.clone(),
      parent,
      parentInv: parent.clone().invert(),
    };
  });

  // ---- Optional dance clip (Mixamo files only) -----------------------------
  const mixer = new THREE.AnimationMixer(root);
  const clip = gltf.animations.find((a) => a.name === 'SambaDance');
  if (clip) mixer.clipAction(clip).play();

  const hips = roles.hips ? { bone: roles.hips, rest: roles.hips.position.clone() } : null;

  return { root, bones, mixer, hips, height, wave, canDance: Boolean(clip) };
}

/**
 * Pre-computes the waving arm as target rotations for the right upper arm,
 * forearm (two swing extremes) and open fingers. The forearm is twisted
 * about its own axis so the palm faces the viewer. Leaves the rig as found.
 */
function buildWavePose(root, find, key, openHand) {
  const upper = find(/(rightarm|rupperarm)$/);
  const fore = find(/(rightforearm|rforearm|rlowerarm)$/);
  const hand = find(/(righthand|rhand)$/);
  const thumb = find(/(righthandthumb2|rfinger01)$/);
  if (!upper || !fore || !hand) return null;

  const saved = [upper, fore, hand].map((b) => b.quaternion.clone());
  root.updateMatrixWorld(true);
  const out = Math.sign(fore.getWorldPosition(_a).x - upper.getWorldPosition(_b).x) || 1;
  const dir = ([x, y, z]) => new THREE.Vector3(x * out, y, z).normalize();

  aimBone(root, upper, fore, dir(WAVE_UPPER_DIR));
  const upperQ = upper.quaternion.clone();

  const foreRest = fore.quaternion.clone();
  const aimFore = (d) => {
    fore.quaternion.copy(foreRest);
    aimBone(root, fore, hand, dir(d));
    if (!thumb) return fore.quaternion.clone();
    // Twist about the forearm until the thumb points towards the head,
    // which puts the palm of a raised right hand towards the viewer.
    const aimed = fore.quaternion.clone();
    root.updateMatrixWorld(true);
    const axis = hand.getWorldPosition(new THREE.Vector3()).sub(fore.getWorldPosition(new THREE.Vector3())).normalize();
    const parentWorld = fore.parent.getWorldQuaternion(new THREE.Quaternion());
    const parentInv = parentWorld.clone().invert();
    let best = aimed;
    let bestScore = -Infinity;
    for (let deg = 0; deg < 360; deg += 6) {
      const twist = new THREE.Quaternion().setFromAxisAngle(axis, deg * DEG);
      fore.quaternion.copy(parentInv).multiply(twist).multiply(parentWorld).multiply(aimed);
      root.updateMatrixWorld(true);
      const rel = thumb.getWorldPosition(new THREE.Vector3()).sub(hand.getWorldPosition(new THREE.Vector3()));
      const score = -rel.x * out + rel.z * 0.5; // inwards, slightly forwards
      if (score > bestScore) {
        bestScore = score;
        best = fore.quaternion.clone();
      }
    }
    return best;
  };
  const foreA = aimFore(WAVE_FORE_A);
  const foreB = aimFore(WAVE_FORE_B);

  [upper, fore, hand].forEach((b, i) => b.quaternion.copy(saved[i]));
  root.updateMatrixWorld(true);

  return { upper, fore, upperQ, foreA, foreB, fingers: openHand };
}

export default function CharacterModel({ reducedMotion = false, onReady }) {
  const gltf = useLoader(GLTFLoader, MODEL_PATH);
  const { root, bones, mixer, hips, height, wave, canDance } = useMemo(() => buildRig(gltf), [gltf]);
  const gl = useThree((s) => s.gl);

  // Sharper textures at glancing angles (face, headphones).
  useEffect(() => {
    const max = gl.capabilities.getMaxAnisotropy();
    root.traverse((o) => {
      if (!o.isMesh) return;
      (Array.isArray(o.material) ? o.material : [o.material]).forEach((m) => {
        ['map', 'normalMap'].forEach((k) => {
          if (m[k]) {
            m[k].anisotropy = max;
            m[k].needsUpdate = true;
          }
        });
      });
    });
  }, [gl, root]);

  useEffect(() => {
    onReady?.({ canDance, canWave: Boolean(wave) });
  }, [onReady, canDance, wave]);

  const state = useMemo(
    () => ({ dance: 0, wave: 0, waveT: 0, yaw: 0, pitch: 0, rotY: 0, frame: 0, t: 0 }),
    []
  );

  useFrame(({ camera, size }, rawDelta) => {
    const dt = Math.min(rawDelta, 0.05);
    const s = state;
    s.t += dt;
    const t = reducedMotion ? 0 : s.t;

    // ---- Dance blend (0 = idle pose, 1 = dance clip) ------------------------
    const wantDance = canDance && rig.dance && !reducedMotion;
    s.dance = damp(s.dance, wantDance ? 1 : 0, 5, dt);
    const dancing = s.dance > 0.002;
    if (dancing) mixer.update(dt);

    // ---- Head / torso follow the pointer ------------------------------------
    s.rotY = damp(s.rotY, rig.rotY, 6, dt);
    const targetYaw = clamp((rig.pointerX - rig.cx) * 2.2, -1, 1) * 0.62 - s.rotY * 0.55;
    const targetPitch = clamp((rig.pointerY - 0.34) * 1.6, -1, 1) * 0.3;
    s.yaw = damp(s.yaw, reducedMotion ? 0 : clamp(targetYaw, -0.85, 0.85), 5, dt);
    s.pitch = damp(s.pitch, reducedMotion ? 0 : targetPitch, 5, dt);

    const breathe = Math.sin(t * 1.5);
    const sway = Math.sin(t * 0.55);

    // ---- Wave blend (0 = arm at her side, 1 = waving) ------------------------
    const wantWave = Boolean(wave) && rig.wave && !wantDance && !reducedMotion;
    s.wave = damp(s.wave, wantWave ? 1 : 0, wantWave ? 7 : 5, dt);
    s.waveT = s.wave > 0.002 ? s.waveT + dt : 0;
    const waving = s.wave > 0.002;
    // Swing starts gently once the arm is up, ~1.5 swings per second.
    const swing = 0.5 + 0.5 * Math.sin(s.waveT * 9.5 - Math.PI / 2);

    for (let i = 0; i < bones.length; i += 1) {
      const { bone, role, idle, parent, parentInv } = bones[i];
      if (dancing) _dance.copy(bone.quaternion);

      // Idle pose, plus a small rotation expressed in the character's own
      // axes (x = nod, y = turn, z = lean) so it works for any rig.
      let x = 0;
      let y = 0;
      let z = 0;
      switch (role) {
        case 'hips':
          y = sway * 0.03;
          z = sway * 0.01;
          break;
        case 'spine':
          z = -sway * 0.012;
          y = s.yaw * 0.1;
          break;
        case 'spine1':
          x = -breathe * 0.01;
          y = s.yaw * 0.1;
          break;
        case 'spine2':
          x = -breathe * 0.008;
          y = s.yaw * 0.12;
          break;
        case 'neck':
          y = s.yaw * 0.28;
          x = s.pitch * 0.35;
          break;
        case 'head':
          y = s.yaw * 0.4;
          x = s.pitch * 0.65;
          z = sway * 0.015;
          break;
        case 'armL':
          z = breathe * 0.012;
          break;
        case 'armR':
          z = -breathe * 0.012;
          break;
        default:
      }
      if (x || y || z) {
        _q.setFromEuler(_e.set(x, y, z));
        bone.quaternion.copy(parentInv).multiply(_q).multiply(parent).multiply(idle);
      } else {
        bone.quaternion.copy(idle);
      }

      if (waving) {
        if (bone === wave.upper) bone.quaternion.slerp(wave.upperQ, s.wave);
        else if (bone === wave.fore) {
          _q.slerpQuaternions(wave.foreA, wave.foreB, swing);
          bone.quaternion.slerp(_q, s.wave);
        } else if (wave.fingers.has(bone)) bone.quaternion.slerp(wave.fingers.get(bone), s.wave);
      }

      if (dancing) bone.quaternion.slerp(_dance, s.dance);
    }

    // The clip also moves the hips through space; blend that back to rest.
    if (hips) {
      if (dancing) hips.bone.position.lerpVectors(hips.rest, hips.bone.position, s.dance);
      else hips.bone.position.copy(hips.rest);
    }

    // ---- Body turn + camera framing ------------------------------------------
    root.rotation.y = s.rotY * (1 - s.dance);

    s.frame = damp(s.frame, Math.max(rig.frame, wantDance ? 0.9 : 0), 4, dt);

    // Portrait: head near the top of the frame. On tall, narrow screens step
    // back so her shoulders stay in shot and her head sits below the name.
    let nearDist = 2.6;
    let nearY = height - 0.4;
    // While waving, her hand reaches ~0.5 m sideways: ease back to keep it in
    // shot (only matters on narrow screens, where this limit applies).
    const viewWidth = lerp(MIN_VIEW_WIDTH, 1.08, s.wave);
    const minDist = viewWidth / (VIEW_SLOPE * (size.width / size.height));
    if (nearDist < minDist) {
      nearDist = minDist;
      nearY = height + 0.02 - 0.29 * VIEW_SLOPE * nearDist;
    }
    const fullDist = Math.max(4.7, nearDist);
    const y = lerp(nearY, height * 0.47, s.frame);
    const dist = lerp(nearDist, fullDist, s.frame);
    camera.position.set(0, y + 0.06, dist);
    camera.lookAt(0, y, 0);
  });

  return (
    <>
      <StudioEnvironment />
      <primitive object={root} />
    </>
  );
}
