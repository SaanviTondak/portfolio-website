# 3D character model

`avatar.glb` is the character shown in the hero. It is loaded by
`src/character/CharacterModel.jsx` (`MODEL_PATH = '/models/avatar.glb'`).

## Source & credit
- **Michelle**, a rigged Mixamo character, taken from the official three.js
  examples: https://github.com/mrdoob/three.js/blob/dev/examples/models/gltf/Michelle.glb
- Mixamo characters are provided by Adobe royalty-free for use in personal and
  commercial projects: https://helpx.adobe.com/creative-cloud/faq/mixamo-faq.html
- Modified for this site (rig and animations untouched):
  - base-colour texture upscaled 512 -> 2048 px and repainted with soft-edged
    masks (keeps the lips and headphone stripe clean)
  - skin tone lightened to a medium tone
  - the grey top extended over the waist and down the arms as long sleeves
  - yellow trousers and headphone band re-hued to navy
  - the puffed hair bunches removed, leaving the sleek centre-parted hair
  - long straight hair added: a generated mesh falling from the crown down
    the back, skinned to the head and upper spine

## Swapping in a different character
Drop any humanoid `.glb` here as `avatar.glb`. The idle pose, head tracking and
scroll choreography are driven by bone names and work with either:
- Mixamo naming (`mixamorig:LeftArm`, `Head`, `Spine1`, ...), or
- 3ds Max Biped naming (`Bip01 L UpperArm`, `Bip01 Head`, ...).

The model should stand at the origin, face +Z, and be roughly 1.6-1.8 units
tall. T-pose or A-pose both work. If the file contains an animation clip named
`SambaDance`, clicking the character plays it.

To make her look like you, an avatar generated from a selfie (e.g. Avaturn or
Avatar SDK's MetaPerson, both export `.glb`) can be dropped in the same way.
