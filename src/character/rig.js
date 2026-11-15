/**
 * Shared, mutable state for the 3D character. GSAP scroll timelines and DOM
 * listeners write to it; the render loop reads it every frame. Kept outside
 * React so scroll scrubbing never triggers re-renders.
 */
export const rig = {
  rotY: 0, // body turn in radians (0 = facing the viewer)
  frame: 0, // camera framing: 0 = waist-up portrait, 1 = full body
  cx: 0.5, // horizontal screen position of the character (0..1)
  dance: false, // click-to-dance easter egg
  wave: false, // waving hello (on arrival and on returning to the hero)
  pointerX: 0.5, // last pointer position, as a fraction of the viewport
  pointerY: 0.35,
};
