# 청첩장 테스트 사진 기록

## 2026-10-10 — 사진 예시 세 장 추가

- 생성 방식: 내장 `image_gen` 도구. 기존 `sample-hero.jpg`를 인물·의상·색감 참고 이미지로 사용했습니다.
- 가상의 성인 커플로 만든 새로운 사진이며, 기존 사진을 교체하지 않고 갤러리에 추가했습니다. 갤러리는 총 6장입니다.
- 웹용 JPEG는 원본 해상도를 유지하고 품질 88로 내보냈습니다. PNG 원본은 기본 생성 폴더와 `.jekyll-local/imagegen-originals/2026-10-10-extra/`에 보존합니다.

| 최종 저장 파일 | 구도 | 해상도 |
| --- | --- | --- |
| [sample-garden-portrait.jpg](../img/wedding/sample-garden-portrait.jpg) | 정원에서 웃는 커플 | 1086 × 1448 |
| [sample-veil-portrait.jpg](../img/wedding/sample-veil-portrait.jpg) | 베일 아래의 가까운 커플 | 1086 × 1448 |
| [sample-sunset-dance.jpg](../img/wedding/sample-sunset-dance.jpg) | 노을 속의 느린 춤 | 1086 × 1448 |

### 추가 사진의 최종 생성 프롬프트

#### 정원에서 웃는 커플: sample-garden-portrait.jpg

```text
Use case: photorealistic-natural.
Asset type: additional example photo for an elegant Korean wedding invitation gallery.
Input image 1 is an APPEARANCE AND STYLE REFERENCE, not an edit target. Create a NEW standalone photo of the same fictional adult Korean couple: groom with short dark hair in a charcoal tailored suit and white shirt, bride with a low dark updo in an ivory floral lace wedding gown. Preserve recognizable faces, clothing and natural adult proportions.
Style: realistic editorial wedding photography, real skin and hair texture, tactile lace and suit fabric, restrained warm ivory, sage foliage and soft blush tones. Natural expressions and believable hands. One vertical 3:4 portrait, high resolution, centered composition with enough edge space for a gallery crop. Opaque photographic background.
Constraints: no text, logos, watermarks, collage, panel grid, frame borders, cartoon, doll appearance or extra people.
Scene: a quiet cream-stone garden courtyard with soft olive foliage and white flowers, gently blurred. Waist-up to mid-thigh candid couple portrait. They stand together and look at each other with warm, spontaneous smiles, not at the camera. Bride rests one hand naturally on the groom's forearm, their other hands relaxed and uncomplicated. Soft overcast daylight, fresh and intimate. Keep both faces comfortably inside the top half with breathing room above their heads.
```

#### 베일 아래의 가까운 커플: sample-veil-portrait.jpg

```text
Use case: photorealistic-natural.
Asset type: additional example photo for an elegant Korean wedding invitation gallery.
Input image 1 is an APPEARANCE AND STYLE REFERENCE, not an edit target. Create a NEW standalone photo of the same fictional adult Korean couple: groom with short dark hair in a charcoal tailored suit and white shirt, bride with a low dark updo in an ivory floral lace wedding gown. Preserve recognizable faces, clothing and natural adult proportions.
Style: realistic editorial wedding photography, real skin and hair texture, tactile lace and suit fabric, restrained warm ivory, sage foliage and soft blush tones. Natural expressions and believable hands. One vertical 3:4 portrait, high resolution, centered composition with enough edge space for a gallery crop. Opaque photographic background.
Constraints: no text, logos, watermarks, collage, panel grid, frame borders, cartoon, doll appearance or extra people.
Scene: a softly blurred garden, photographed through the bride's light translucent veil. An intimate shoulder-up portrait of both people under the same veil, leaning their foreheads gently close, eyes softly open or lowered, quiet smiles. The veil catches diffused window-like daylight with realistic fine threads; both faces remain clearly visible. Hands below the crop to keep the image simple. Calm warm cream and faint rose tones, tasteful romantic wedding editorial, no kiss and no exaggerated glamour.
```

#### 노을 속의 느린 춤: sample-sunset-dance.jpg

```text
Use case: photorealistic-natural.
Asset type: additional example photo for an elegant Korean wedding invitation gallery.
Input image 1 is an APPEARANCE AND STYLE REFERENCE, not an edit target. Create a NEW standalone photo of the same fictional adult Korean couple: groom with short dark hair in a charcoal tailored suit and white shirt, bride with a low dark updo in an ivory floral lace wedding gown. Preserve recognizable faces, clothing and natural adult proportions.
Style: realistic editorial wedding photography, real skin and hair texture, tactile lace and suit fabric, restrained warm ivory, sage foliage and soft blush tones. Natural expressions and believable hands. One vertical 3:4 portrait, high resolution, centered composition with enough edge space for a gallery crop. Opaque photographic background.
Constraints: no text, logos, watermarks, collage, panel grid, frame borders, cartoon, doll appearance or extra people.
Scene: a quiet garden terrace beside a cream stone wall at golden hour, muted olive trees in the background. Full-body view of the couple sharing a gentle slow-dance moment. Groom and bride face each other with one simple natural hand connection, his other arm resting lightly near her waist, her free hand relaxed. Her ivory lace skirt curves softly with their small movement. No exaggerated spin or flying fabric. Warm backlight around hair and veil, soft golden evening light, realistic shoes and natural body proportions. Entire couple and hem visible with clear margins, people centered rather than filling every edge.
```

## 기존 사진 생성 기록


- 생성·반영 일시: 2026-10-06 00:15:10 KST
- 생성 방식: 내장 `image_gen` 도구. 별도 API·CLI는 사용하지 않았습니다.
- 용도: 청첩장 대표 이미지와 갤러리를 확인하기 위한 테스트 사진. 인물과 장면은 가상으로 생성했습니다.
- 저장 폴더: `D:\kimyongrok\Grokeen.github.io\img\wedding\`
- 웹용 JPEG는 원본 해상도를 유지하고 품질 88로 인코딩했습니다. 사진 내용과 구도는 수정하지 않았습니다.
- 생성 원본 PNG는 기본 생성 폴더에 유지하고, 작업 폴더의 `.jekyll-local/imagegen-originals/`에도 복사했습니다.

| 파일 | 사용 위치 | 해상도 |
| --- | --- | --- |
| [sample-hero.jpg](../img/wedding/sample-hero.jpg) | 대표 사진 | 1122 × 1402 |
| [sample-bouquet.jpg](../img/wedding/sample-bouquet.jpg) | 갤러리: 부케 | 1086 × 1448 |
| [sample-rings.jpg](../img/wedding/sample-rings.jpg) | 갤러리: 반지 | 1086 × 1448 |
| [sample-walk.jpg](../img/wedding/sample-walk.jpg) | 갤러리: 뒷모습 | 1086 × 1448 |

청첩장 연결은 [`_data/wedding.yml`](../_data/wedding.yml)의 `photos` 항목에서 변경합니다. 교체 방법은 [청첩장 가이드](WEDDING.md)를 참고하세요.

## 최종 생성 프롬프트

### 대표 사진: sample-hero.jpg

```text
Use case: photorealistic-natural
Asset type: portrait hero photograph for an ivory-and-sage Korean mobile wedding invitation, sample content.
Primary request: Generate one tasteful photorealistic wedding portrait of a fictional adult Korean bride and groom in their late twenties, standing together in a peaceful garden. The bride wears an elegant ivory wedding dress and holds a small white floral bouquet; the groom wears a charcoal suit with a white shirt. Both smile softly, relaxed and natural.
Scene/backdrop: soft garden foliage and a cream stone wall, shallow depth of field.
Composition/framing: one single vertical 4:5 photograph, full couple from head to near their feet, centered within the middle 70 percent so an arched website crop keeps both faces and bouquet visible; breathing room above their heads.
Lighting/mood: soft late-afternoon daylight, gentle editorial wedding photography, realistic skin and fabric texture, understated fine film grain. Warm cream, muted sage green, restrained colors matching an elegant invitation.
Constraints: fictional people only, realistic anatomy and hands, no text, no lettering, no logos, no watermark, no collage, no frames. Opaque photograph.
```

### 갤러리: 부케: sample-bouquet.jpg

```text
Use case: photorealistic-natural
Asset type: test gallery photo for an ivory-and-sage Korean mobile wedding invitation.
Style/medium: one single photorealistic editorial wedding photograph, natural texture, warm cream and muted sage green tones, subtle fine film grain, soft daylight, no oversaturated colors.
Composition: vertical 3:4 photograph with the subject centered for a small gallery thumbnail.
Constraints: no text, no logos, no watermarks, no collage, no frames, opaque background.
Primary request: Close-up of a small bridal bouquet of ivory roses and delicate white flowers with olive and eucalyptus leaves, tied with a simple cream silk ribbon. A fictional adult bride holds the bouquet gently in front of an ivory floral lace wedding dress. Crop below the shoulders so no face is visible. Natural hands, realistically detailed flower petals and lace, softly blurred garden background, intimate and calm.
```

### 갤러리: 반지: sample-rings.jpg

```text
Use case: photorealistic-natural
Asset type: test gallery photo for an ivory-and-sage Korean mobile wedding invitation.
Style/medium: one single photorealistic editorial wedding photograph, natural texture, warm cream and muted sage green tones, subtle fine film grain, soft daylight, no oversaturated colors.
Composition: vertical 3:4 photograph with the subject centered for a small gallery thumbnail.
Constraints: no text, no logos, no watermarks, no collage, no frames, opaque background.
Primary request: An elegant overhead wedding detail photograph of exactly two simple gold wedding bands resting side by side, slightly overlapping, on softly folded ivory linen. Include a delicate sprig of olive leaves and a few small white flowers near the edge. Realistic round rings, subtle gold reflections, tactile woven fabric, sparse balanced composition, soft window light.
```

### 갤러리: 뒷모습: sample-walk.jpg

```text
Use case: photorealistic-natural
Asset type: test gallery photo for an ivory-and-sage Korean mobile wedding invitation.
Style/medium: one single photorealistic editorial wedding photograph, natural texture, warm cream and muted sage green tones, subtle fine film grain, soft daylight, no oversaturated colors.
Composition: vertical 3:4 photograph with the subject centered for a small gallery thumbnail.
Constraints: no text, no logos, no watermarks, no collage, no frames, opaque background.
Primary request: A fictional adult Korean bride and groom in their late twenties seen entirely from behind, walking together down a quiet garden path beside a cream stone wall and olive foliage. The bride has dark hair in a low updo and wears an ivory floral lace wedding dress with a modest flowing train. The groom has short dark hair and wears a charcoal suit. Their arms rest naturally, walking close together without complicated hand gestures. Full body with heads visible in the upper middle of the frame, peaceful late-afternoon light, soft background depth.
```
