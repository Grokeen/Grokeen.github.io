---
layout: content
title:  "[Raspberry Pi] 카메라 모듈 구매 후기"
date:   2023-03-17 12:45:29 +0900
categories: RaspberryPi
pin: true
---

<img src="/img/blogimg/RaspberryPi/IMG_3344.jpeg" style="height:500px">
<!-- ![라즈베리파이 카메라]({{site.img}}/blogimg/RaspberryPi/IMG_3344.jpeg "카메라 모듈") -->

# 라즈베리파이 카메라 모듈을 사용하여 파이썬으로 사진 찍기

라즈베리파이 카메라 모듈을 사용하여 파이썬으로 사진을 찍는 코드는 다음과 같다.

```python
import picamera
import time

with picamera.PiCamera() as camera:
    camera.resolution = (1024, 768) # 카메라 해상도 설정
    camera.start_preview() # 미리보기 화면 시작
    # 2초간 대기하여 카메라가 미리보기를 시작하도록 함
    time.sleep(10)
    camera.capture('image.jpg') # 사진 촬영 후 파일로 저장
```
<br>
해당 코드에서는 `picamera` 모듈을 사용하여 라즈베리파이 카메라 모듈을 제어하고, `resolution` 속성으로 카메라 해상도를 설정합니다. 그리고 `start_preview()` 메서드로 미리보기 화면을 시작하고, `capture()` 메서드로 사진을 촬영하고 파일로 저장합니다. 추가적으로, `time` 모듈을 사용하여 사진을 찍기 전에 2초간 대기하여 카메라가 미리보기를 시작하도록 하였습니다.

## 라즈베리파이 카메라 모듈과 관련된 파이썬 코드

### 자주 사용되는 몇 가지 문법과 메서드

- `picamera.PiCamera()` : 라즈베리파이 카메라 모듈을 사용하기 위한 객체 생성
- `camera.start_preview()` : 미리보기 화면 시작
- `camera.stop_preview()` : 미리보기 화면 종료
- `camera.capture('filename.jpg')` : 이미지 캡처 및 저장
- `camera.resolution` : 해상도 설정
- `camera.brightness` : 밝기 설정
- `camera.contrast` : 명암 대비 설정
- `camera.sharpness` : 선명도 설정
- `camera.rotation` : 이미지 회전 설정
- `camera.annotate_text` : 미리보기 화면에 텍스트 추가
- `camera.annotate_text_size` : 텍스트 크기 설정
- `camera.annotate_foreground` : 텍스트 색상 설정
- `camera.annotate_background` : 텍스트 배경 색상 설정
- `camera.annotate_text_width` : 텍스트 가로폭 설정
- `camera.annotate_text_alpha` : 텍스트 투명도 설정

위와 같은 문법과 메서드를 활용하여 라즈베리파이 카메라 모듈로부터 이미지를 캡처하고, 설정을 변경하며 미리보기 화면을 제어할 수 있습니다.


# 결론
사용해보니 화질이 내가 생각한 것 보다 훨신 안 좋았다. 유튜브에서 라즈베리파이를 이용해 카메라로 만드는 영상 보고 해볼까 했는데 매우 실망스러웠다. 라즈베리파이 키트를 구매하면 있는 기존 카메라 모듈과 크게 차이가 없었다. 아니면 내가 잘 못한 걸 수도 있다.
또 다른 생각으로 배송 올 때, 약간의 고장이 생긴다든지, MCU에 문제가 있어 중간에 값 전달 시, 정보가 유실되는 걸 수 도 있겠다 생각했다.
