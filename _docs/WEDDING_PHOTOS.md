# 청첩장 테스트 사진 기록

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
