# 3D Avatar model

Place your avatar model here as:

    public/models/avatar.glb

## What to use
A stylized 3D cartoon character of a girl/woman (friendly, clean, modern
Blender/Spline-style illustration). Export as **.glb** (binary glTF) for the
smallest size and fastest load.

## Where to get one
- **Ready Player Me** (https://readyplayer.me) — free stylized avatars, exports .glb
- **Spline** (https://spline.design) — design + export to .glb / .gltf
- **Blender** — model your own, then File → Export → glTF Binary (.glb)
- **Sketchfab / Poly Pizza** — many free CC-licensed stylized characters

## How it's wired
`src/sections/avatar/AvatarModel.jsx` loads `MODEL_PATH = '/models/avatar.glb'`.
Until you add the file, the scene automatically shows a procedural placeholder
character (`PlaceholderAvatar.jsx`) so nothing looks broken.

## Tips
- Keep it under ~5 MB; run it through https://gltf.report or `gltf-pipeline -i
  avatar.glb -o avatar.glb --draco.compressionLevel 7` to compress.
- Model should face **+Z** (toward camera) and stand around the origin.
- If your model has baked animation clips, you can play them by extending
  `AvatarModel.jsx` with drei's `useAnimations`.
