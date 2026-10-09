# 실사풍 360도 오프닝 이미지 기록

## 배경 차이 수정 — 투명 부케 동작 이미지 v3

- 생성·편집 방식: 내장 `image_gen` 도구의 배경 제거 편집.
- 최종 저장 파일: [opening-bouquet-motion-v3.png](../img/wedding/opening-bouquet-motion-v3.png).
- 크기: 1536 × 1024, RGBA PNG, 4열 × 4행.
- 인물 주변과 인물 사이의 스튜디오 배경을 투명하게 제거했습니다. 드레스·정장·동작과 16개 프레임 구조는 유지합니다.
- 각 프레임의 빈 배경 알파와 드레스·정장의 불투명도를 확인했습니다. 신부측 렌더러는 PNG 알파를 그대로 사용하고 하나의 로즈 배경을 그립니다. 6.5m 간격과 마지막 받기 프레임은 유지합니다.

### 최종 편집 프롬프트

```text
Use case: background-extraction.
Edit target: the supplied wedding animation atlas, a 1536x1024 image with EXACTLY 4 columns x 4 rows of 16 frames.
Remove ONLY the ivory studio backdrop and floor behind the two people from EVERY cell. Output true transparent alpha, not a white/grey/black/checkerboard background.
CRITICAL INVARIANTS: preserve the exact image dimensions 1536x1024, 4x4 cell boundaries, camera, framing, each person's position, size, every animation pose, facial identity, hands, charcoal suit, ivory gown, veil, bouquets and photographic lighting. Do not redraw, rearrange, re-scale, beautify, change colour or reinterpret the subjects. Preserve fine hair and veil edges with natural antialiasing; retain the ivory/white dress itself as opaque clothing, not transparency.
The original first row (frames 1-4) has the bride HOLDING/preparing to throw the bouquet: keep it in her hands. The middle TWO rows (frames 5-12) have NO BOUQUET in the air or hands: keep those frames without flowers, a separate sprite will be animated there. The last row (frames 13-16) has the groom holding the CAUGHT bouquet: preserve it in his hands. No new flowers, objects, shadows on a coloured ground, labels, frame lines or text.
Keep precisely the source people and their sixteen action states; only make the background transparent. Every empty part of every cell, including between the couple, around their arms, above their heads and around gown/train outlines, must be transparent. No ivory rectangles, halos or remaining studio wall around either person.
```


## 최신 재생 구성 — 6m 이상 간격과 정확한 시작·끝

- 새로운 이미지는 생성하지 않고 아래 v2 동작 이미지와 투명 부케를 그대로 사용합니다.
- 청혼은 손이 어깨에 닿는 2번 프레임으로 시작해 청혼하는 15번 프레임으로 끝납니다.
- 부케의 두 인물은 개별 레이어로 표시합니다. 가상 공간에서 신랑 x=1m, 신부 x=7.5m로 6.5m 간격을 유지하고, 부케도 같은 좌표계의 포물선으로 이동합니다.
- 부케는 처음 받은 12번 프레임에서 끝납니다. 이후의 가슴으로 당기기·정리 동작과 마지막 자세의 회전은 현재 재생에서 제외합니다.
- 현재 시작·끝과 간격은 `_docs/WEDDING.md`의 웨딩 오프닝 수정 항목을 참고하세요. 아래 회전 이미지 기록은 이전 구현의 이력입니다.

## 2026-10-09 — 동작과 넓은 간격을 추가한 v2

내장 `image_gen` 도구로 생성·편집했습니다. 가상의 성인 한국인 커플과 기존 실사풍을 유지했습니다. 최종 PNG는 내용·해상도를 바꾸지 않고 프로젝트에 복사했으며, 이전 이미지는 보존합니다.

- 청혼: 어깨를 두 번 가볍게 두드리고, 신부가 돌아보면 신랑이 한 걸음 물러나 한쪽 무릎을 꿇고 반지를 건넵니다.
- 부케: 두 사람이 넓은 간격을 유지하며 신부가 던지고 신랑이 받습니다. 공중 부케는 별도 투명 PNG를 연속 포물선으로 그립니다.
- 동작을 마치면 마지막 자세로 360° 회전합니다. 스크롤을 올리면 동작도 되감깁니다.

| 최종 저장 파일 | 크기 | 구성 |
| --- | --- | --- |
| [opening-proposal-motion-v2.png](../img/wedding/opening-proposal-motion-v2.png) | 1536 × 1024 | 4열 × 4행 청혼 동작 |
| [opening-bouquet-motion-v2.png](../img/wedding/opening-bouquet-motion-v2.png) | 1536 × 1024 | 4열 × 4행 부케 동작, 공중 부케 제거 |
| [opening-proposal-orbit-v2.png](../img/wedding/opening-proposal-orbit-v2.png) | 2172 × 724 | 4열 × 2행 청혼 회전 |
| [opening-bouquet-orbit-v2.png](../img/wedding/opening-bouquet-orbit-v2.png) | 2172 × 724 | 4열 × 2행 부케 회전 |
| [opening-bouquet-sprite-v2.png](../img/wedding/opening-bouquet-sprite-v2.png) | 1190 × 1322 | 투명 부케 |

### v2 최종 생성·편집 프롬프트

#### 청혼 동작 프레임

```text
Use case: photorealistic-natural. Production sprite animation for an elegant Korean wedding invitation.
Appearance reference: keep the same fictional ADULT Korean groom and bride, realistic faces and skin, charcoal suit, white shirt, ivory satin gown and long veil from the input image. Natural human proportions and hands, soft daylight studio photography, not figurines or illustration.
Layout: ONE LANDSCAPE image with an EXACT 4-column x 4-row grid of SIXTEEN equal LANDSCAPE 3:2 frames. Overall image ratio 3:2. Aim for 3840x2560 pixels. No borders, gutters, text or labels. Every frame uses the same warm ivory #f4f0e5 background, fixed side-on camera, exact same floor, same scale and framing. Full bodies, shoes and veil train visible. Leave 10% space at edges. Read frames left-to-right, top-to-bottom as consecutive MOMENTS IN TIME. Camera never changes during these action frames; only the action changes. Make intermediate poses incremental and consistent.
Action: the man gently taps the woman's near shoulder TWICE, she turns to him, he steps back to give her room, then lowers to ONE knee and opens a ring box to propose. A light friendly shoulder tap, no push or violence. Initially he stands slightly behind and to her LEFT, close enough to reach her shoulder; she looks slightly to the RIGHT and has not noticed him. He ends kneeling LEFT of her with about a metre of visible space, bride standing RIGHT looking down warmly.
Exact frames:
1 both standing, groom just behind her left shoulder, his hand down; bride looking away.
2 groom raises his right hand halfway toward her near shoulder.
3 fingertips contact the bride's near shoulder: FIRST gentle tap.
4 groom pulls his hand back about ten centimetres; clear separation after the first tap.
5 fingertips touch the SAME near shoulder again: SECOND gentle tap.
6 groom withdraws his hand; bride begins turning her head toward him.
7 bride turns shoulders and upper body toward the groom, pleasantly surprised; groom smiles.
8 both now face each other, groom lowers his hand.
9 groom takes a small step BACK to the LEFT, creating more room between their bodies, his hand reaches for the ring box.
10 groom finishes the step back, both remain standing, ring box held low.
11 groom bends both knees slightly, starting to lower his body, bride watches.
12 groom lowers further, one foot forward and the opposite knee halfway toward the floor, torso upright.
13 groom's rear knee almost touches the ground, ring box held near waist.
14 groom rests ONE knee on the floor, other foot planted forward, holds ring box.
15 groom opens and raises the ring box toward the bride.
16 final proposal: groom LEFT on one knee offering the open ring box, bride RIGHT with one hand near her heart and a warm smile; more space than the reference.
Important: do not put the man kneeling in the early frames. Frames 3 and 5 show shoulder CONTACT and frame 4 shows his hand AWAY. Show actual lowering through frames 11-14. Keep the woman upright and in the same location throughout. No bouquet in this scene.
```

#### 부케 동작 프레임 원본

```text
Use case: photorealistic-natural. Production sprite animation for an elegant Korean wedding invitation.
Appearance reference: keep the same fictional ADULT Korean groom and bride, realistic faces and skin, charcoal suit, white shirt, ivory satin gown and long veil from the input image. Natural human proportions and hands, soft daylight studio photography, not figurines or illustration.
Layout: ONE LANDSCAPE image with an EXACT 4-column x 4-row grid of SIXTEEN equal LANDSCAPE 3:2 frames. Overall image ratio 3:2. Aim for 3840x2560 pixels. No borders, gutters, text or labels. Every frame uses the same warm ivory #f4f0e5 background, fixed side-on camera, exact same floor, same scale and framing. Full bodies, shoes and veil train visible. Leave 10% space at edges. Read frames left-to-right, top-to-bottom as consecutive MOMENTS IN TIME. Camera never changes during these action frames; only the action changes. Make intermediate poses incremental and consistent.
Action: the bride standing on the RIGHT throws one small ivory-and-blush bouquet in a clearly visible HIGH PARABOLIC ARC to the groom standing on the LEFT, who catches it with BOTH hands and holds it. Keep them far apart: about TWO METRES of OPEN SPACE between their bodies in EVERY frame. Do not let them walk together or move closer. Camera is pulled back enough to show their entire bodies AND the high flight arc. Their feet remain at the SAME positions in all sixteen frames. Exactly ONE bouquet appears in every frame, never two.
Exact frames:
1 bride holds bouquet at waist, groom's hands relaxed, they face each other across the wide gap.
2 bride raises bouquet toward chest; groom begins preparing his hands.
3 bride raises bouquet to head height to prepare the throw, feet fixed.
4 bride draws hand slightly back and then begins the forward/upward throwing motion.
5 release: bouquet has JUST left her extended throwing hand, travelling upward and toward the LEFT.
6 bouquet airborne above and a little LEFT of bride; her arm follows through, groom reaches up.
7 bouquet one quarter of the way across the gap, rising well above their heads.
8 bouquet almost midway, near the top of the high arc.
9 bouquet at the APEX between them, high above both heads, hands empty.
10 bouquet past the middle, moving LEFT and beginning to descend.
11 bouquet descending toward groom, close to his raised hands.
12 bouquet immediately above the groom's open hands; bride's throwing hand lowers.
13 groom catches bouquet: BOTH hands make contact with its stems.
14 groom draws the caught bouquet toward his chest.
15 groom settles his arms and holds the bouquet at chest height, smiling toward bride.
16 final: groom holds the bouquet safely with BOTH hands at chest height, bride stands across the SAME two-metre gap with relaxed arms, smiling.
Important: make flower position trace ONE clear curved trajectory from RIGHT to LEFT. No flowers floating in the final held frame. Don't shrink or move the people from cell to cell. No kneeling, no ring box, no extra people.
```

#### 공중 부케 제거 편집

```text
Use case: precise-object-edit. Edit target: the supplied 4x4 bouquet throwing sprite sheet.
Make exactly ONE change: remove the floating airborne bouquet from the EIGHT frames in rows 2 and 3 (frames 5 through 12). Fill those tiny flower areas with the matching warm ivory studio background. Keep the groom, bride, hands, poses, entire scene, faces, clothes, lighting, floor, wide spacing, exact frame boundaries, cell sizes, dimensions and grid unchanged.
DO NOT change row 1 (frames 1-4): keep the bouquet she holds/prepares to throw there.
DO NOT change row 4 (frames 13-16): keep the bouquet the groom has caught and holds there.
The ONLY removed objects are the eight airborne bouquets in rows 2-3. Do not add any text or borders. This cleaned atlas will be combined with a separately animated bouquet. Keep 4 columns and 4 rows, landscape 3:2 overall. Opaque background.
```

#### 청혼 마지막 자세 회전

```text
Use case: photorealistic-natural. Production 360-degree turntable sprite atlas.
Use supplied image as identity, clothing, studio lighting and FINAL POSE reference. Same fictional adult Korean couple, charcoal suit, ivory satin gown, veil, realistic skin, soft warm ivory studio backdrop #f4f0e5. Keep the SAME positions, scale and pose as frame 16 (bottom-right) of reference action sheet.
ONE landscape image, EXACT 4 columns by 2 rows, eight equally sized landscape 3:2 cells, overall ratio 3:1, ideally 3072x1024. No borders, gaps, text, numbers or labels. Full bodies and floor shadows visible, clear edge margin. Camera orbits the SAME fixed couple:
Row 1 cell 1 = 0°: same side-on camera as reference final cell, man LEFT, woman RIGHT, facing each other.
Row 1 cell 2 = 45°: toward bride's back, bride nearer RIGHT three-quarter BACK, groom farther LEFT three-quarter FRONT.
Row 1 cell 3 = 90°: directly BEHIND bride: back of head, veil and gown foreground, groom beyond her partly facing camera.
Row 1 cell 4 = 135°: bride nearer LEFT three-quarter BACK, groom farther RIGHT three-quarter FRONT.
Row 2 cell 1 = 180°: opposite side-on view: bride LEFT, groom RIGHT in profile facing one another.
Row 2 cell 2 = 225°: groom nearer RIGHT three-quarter BACK, bride farther LEFT three-quarter FRONT.
Row 2 cell 3 = 270°: directly BEHIND groom: back of head/suit foreground, bride beyond him facing camera.
Row 2 cell 4 = 315°: groom nearer LEFT three-quarter BACK, bride farther RIGHT three-quarter FRONT.
All eight camera locations must be visually distinct, including the TWO direct-back views. Poses stay locked and human sizes stay fixed in world coordinates; do not shrink or swap identities. Pose: groom on ONE knee offering an open ring box to standing bride, who has one hand near her heart. Preserve the increased separation from the reference final frame: approximately one metre of open space, groom not touching her dress. No bouquet. Natural adult anatomy, exact same suit and gown.
```

#### 부케 마지막 자세 회전

```text
Use case: photorealistic-natural. Production 360-degree turntable sprite atlas.
Use supplied image as identity, clothing, studio lighting and FINAL POSE reference. Same fictional adult Korean couple, charcoal suit, ivory satin gown, veil, realistic skin, soft warm ivory studio backdrop #f4f0e5. Keep the SAME positions, scale and pose as frame 16 (bottom-right) of reference action sheet.
ONE landscape image, EXACT 4 columns by 2 rows, eight equally sized landscape 3:2 cells, overall ratio 3:1, ideally 3072x1024. No borders, gaps, text, numbers or labels. Full bodies and floor shadows visible, clear edge margin. Camera orbits the SAME fixed couple:
Row 1 cell 1 = 0°: same side-on camera as reference final cell, man LEFT, woman RIGHT, facing each other.
Row 1 cell 2 = 45°: toward bride's back, bride nearer RIGHT three-quarter BACK, groom farther LEFT three-quarter FRONT.
Row 1 cell 3 = 90°: directly BEHIND bride: back of head, veil and gown foreground, groom beyond her partly facing camera.
Row 1 cell 4 = 135°: bride nearer LEFT three-quarter BACK, groom farther RIGHT three-quarter FRONT.
Row 2 cell 1 = 180°: opposite side-on view: bride LEFT, groom RIGHT in profile facing one another.
Row 2 cell 2 = 225°: groom nearer RIGHT three-quarter BACK, bride farther LEFT three-quarter FRONT.
Row 2 cell 3 = 270°: directly BEHIND groom: back of head/suit foreground, bride beyond him facing camera.
Row 2 cell 4 = 315°: groom nearer LEFT three-quarter BACK, bride farther RIGHT three-quarter FRONT.
All eight camera locations must be visually distinct, including the TWO direct-back views. Poses stay locked and human sizes stay fixed in world coordinates; do not shrink or swap identities. Pose: both STANDING approximately TWO METRES apart with clear open space. Groom holds the CAUGHT ivory-and-blush bouquet firmly with BOTH hands at his CHEST. Bride's arms are relaxed, she smiles toward him. Bouquet never floats in the air in these final-pose orbit frames. Keep the wide distance even in three-quarter views; 90° and 270° may occlude because of perspective, do not move them closer physically. No kneeling, no ring box.
```

#### 투명 부케

```text
Use case: photorealistic-natural. Asset: transparent photorealistic bouquet cutout for an animated wedding invitation.
Appearance reference: the small ivory-and-blush bouquet in the supplied throwing sprite sheet, flowers only. Make ONE isolated bouquet: soft ivory roses, a few pale blush flowers, small sage leaves, short green stems gathered with an ivory satin ribbon. Realistic petals, natural texture, gentle studio daylight matching reference. Bouquet viewed at a slight three-quarter angle, flower heads facing up, stems pointing diagonally down. Centered with 15% transparent clear space. No people, hands, background, floor or shadow, no text or logos. Actual transparent alpha, not a white/checkerboard background.
```

## 초기 고정 자세 이미지


- 생성 방식: 내장 `image_gen` 도구. API·CLI는 사용하지 않았습니다.
- 인물: 실제 사람의 사진을 사용하지 않은 가상의 성인 한국인 커플.
- 두 자세: 한쪽 무릎을 꿇고 반지를 건네는 청혼, 서서 신부의 부케를 받는 신랑.
- 각 이미지: 1774 × 887 PNG, 4열 × 2행의 8개 시점. 0°부터 45°씩 카메라 방향을 바꿉니다.
- 원본을 내용·해상도 변경 없이 프로젝트에 복사했습니다. 각 셀의 실수 좌표를 그대로 사용해 픽셀 손실 없이 Canvas에 표시합니다.
- 고정된 자세의 여러 시점을 이어 회전하며, 부케를 던지는 시간 흐름은 포함하지 않습니다.

| 파일 | 자세 |
| --- | --- |
| [opening-proposal-atlas.png](../img/wedding/opening-proposal-atlas.png) | 청혼 |
| [opening-bouquet-atlas.png](../img/wedding/opening-bouquet-atlas.png) | 부케 받기 |

## 청혼 최종 프롬프트

```text
Use case: photorealistic-natural.
Asset type: an eight-direction photographic turntable sprite sheet for a wedding website.
Input image: appearance reference only. Preserve the same fictional adult Korean bride and groom, charcoal suit, ivory satin gown, veil and realistic editorial photography. Change the layout and viewpoints completely.
Produce ONE landscape image, exactly 4 columns by 2 rows of eight equally sized SQUARE photos, no gaps, no lines, no labels. Ideally 4096 x 2048 pixels. Background in EVERY cell is the SAME solid warm ivory #f4f0e5 with a small realistic contact shadow. NOT transparent.
Pose invariant: groom is kneeling on ONE knee, offering an open ring box with both hands to the standing bride, who smiles down at him with one hand near her heart. Their feet and bodies stay fixed in the world. Full bodies, veil, bent knee and ring box visible, plenty of empty space, same center, scale and camera elevation in every square. Natural adult proportions and detailed skin, fabric and hair.
CRITICAL: the eight cells MUST have visibly DIFFERENT camera views, a full 360 orbit, not a repeated side photograph.
Row 1 cell 1: side-on view of the pair: groom on LEFT, bride on RIGHT, their faces in profile facing each other.
Row 1 cell 2: orbit 45 degrees around toward the bride's back: bride in nearer RIGHT foreground three-quarter BACK, groom's face three-quarter FRONT on farther LEFT.
Row 1 cell 3: orbit 90 degrees: camera directly BEHIND THE BRIDE, showing the back of her head, veil and dress in the foreground; groom kneeling beyond her facing the camera, partly visible. Do not turn the bride to face camera.
Row 1 cell 4: orbit 135 degrees: bride now nearer LEFT, three-quarter BACK, groom farther RIGHT three-quarter FRONT.
Row 2 cell 1: orbit 180 degrees: opposite side-on view, bride on LEFT, groom on RIGHT; both in profile facing each other. Same locked pose viewed from opposite side.
Row 2 cell 2: orbit 225 degrees: groom nearer RIGHT three-quarter BACK, bride farther LEFT three-quarter FRONT.
Row 2 cell 3: orbit 270 degrees: camera directly BEHIND THE GROOM, back of his head and suit in foreground, bride farther away looking toward camera. Do not turn groom toward camera.
Row 2 cell 4: orbit 315 degrees: groom nearer LEFT three-quarter BACK, bride farther RIGHT three-quarter FRONT.
The back-of-head views in row 1 cell 3 and row 2 cell 3 are essential; do not replace them with side views. Photographing the same frozen couple from eight locations, NO motion or identity changes. No cartoon, miniature, 3D doll look, text, numbers, frame borders, extra people, extra hands or repeated angles.
```

## 부케 받기 최종 프롬프트

```text
Use case: photorealistic-natural.
Asset type: eight-direction photographic turntable sprite sheet for a wedding invitation, matching the supplied proposal sheet.
Input image: appearance and layout reference only. Keep the SAME fictional adult Korean bride and groom, faces, charcoal suit, white shirt, ivory satin wedding gown, veil, realistic photography and soft ivory studio background. Change ONLY their pose/action to a bouquet catch; no kneeling and no ring box.
Produce ONE landscape image, exact 4-column by 2-row grid of eight equal SQUARE photos, no gutters or borders, ideally 4096x2048. Every cell has a solid warm ivory #f4f0e5 studio backdrop and subtle floor contact shadows. Full bodies centered, identical scale and framing, at least 8 percent empty margins on every side.
LOCKED POSE IN ALL EIGHT CELLS: Both people STAND facing each other. Bride has just gently tossed a small ivory-and-blush flower bouquet toward the groom, one hand extended in a natural follow-through. Groom smiles and reaches out with BOTH hands to RECEIVE / CATCH the bouquet at chest height. Bouquet is just above his two open hands, close enough for the catch to be clear. Frozen split second of a tender bouquet catch, physically plausible arms, hands, fingers and flower stems. They do not change pose as the camera goes around. Natural adult proportions, real skin texture and satin/suit fabric detail, soft daylight editorial photograph, not a doll or cartoon.
The camera moves around the SAME frozen pair, a complete 360 orbit, each cell visibly a different view:
Row 1 cell 1, 0 degrees: side-on pair, groom on LEFT and bride on RIGHT, faces in profile facing each other, bouquet near the groom's receiving hands.
Row 1 cell 2, 45 degrees: toward bride's back, bride nearer RIGHT foreground three-quarter BACK, groom farther LEFT three-quarter FRONT.
Row 1 cell 3, 90 degrees: directly BEHIND THE BRIDE, back of head, veil and gown in foreground; standing groom beyond her facing camera, his receiving hands and bouquet partly visible around her.
Row 1 cell 4, 135 degrees: bride nearer LEFT three-quarter BACK, groom farther RIGHT three-quarter FRONT.
Row 2 cell 1, 180 degrees: opposite side-on pair, bride on LEFT, groom on RIGHT, faces in profile facing one another.
Row 2 cell 2, 225 degrees: groom nearer RIGHT three-quarter BACK, bride farther LEFT three-quarter FRONT.
Row 2 cell 3, 270 degrees: directly BEHIND THE GROOM, back of head and suit foreground, bride farther away facing camera.
Row 2 cell 4, 315 degrees: groom nearer LEFT three-quarter BACK, bride farther RIGHT three-quarter FRONT.
Preserve these two straight BACK views, do not replace with repeated side views. Consistent floor line, same real people, no missing or extra limbs, no ring box, no kneeling, no labels, no text, no logos, no frame lines or contact sheet spacing. Opaque image.
```
