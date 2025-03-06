# 점심 뭐 먹지

## 기능 요구 사항

### 화면 구성

- [x] Header
- [x] 새로운 음식점 추가 버튼
- Main

  - [x] 음식점 아이템
    - [x] 카테고리 이미지
    - [x] 이미지 설명
    - [x] 이름
    - [x] 거리(도보 이동 시간)
    - [x] 설명
    - [x] 참고 링크

- Modal
  - [] title
  - [] 카테고리(select)
    - ["한식", "중식", "일식", "아시안", "양식", "기타"]
  - [] 이름 (input, type: text)
  - [] 거리(분) (select)
    - [5, 10, 15, 20, 30]
  - [] 설명 (input, type: text)
  - [] 참고 링크 (input, type: text)
  - [] 취소하기 버튼 (button)
  - [] 추가하기 버튼 (button)

<br>

### 기능

- [x] 음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄우는 기능

- [x] 모달 창

  - [x] 새로운 음식점 정보를 입력
    - required - 카테고리, 이름, 거리
    - optional - 설명, 참고 링크
  - [x] 모달 외부를 클릭
    - [x] 입력을 초기화
    - [x] 모달을 닫는 기능
  - [x] ESC 키 다운
    - [x] 입력을 초기화
    - [x] 모달을 닫는 기능

- [x] 취소하기 버튼

  - [x] 입력을 초기화
  - [x] 모달을 닫는 기능

- [x] 추가하기 버튼

  - [x] 음식점 아이템을 추가
  - [x] 입력을 초기화
  - [x] 모달을 닫는 기능

- [] 입력값이 잘못되었을 때 alert로 사용자에게 알려주는 기능
- [] 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화하는 기능

<br>

### 예외 처리

- 음식점 추가 기능(모달 창)
  - [] 필수 항목을 입력하지 않으면 예외 처리한다.
  - [] 참고 링크에 URL 형식을 입력하지 않으면 예외 처리한다.

<br>

### 테스트

- 초기 렌더링 테스트

  - [x] 앱이 정상적으로 로드되고 주요 UI 요소가 렌더링되는지 확인
  - [] 모달이 떴을 때 모달 UI 요소가 렌더링되는지 확인

- 동작 테스트

  - header

    - [] 새로운 음식점 추가 버튼을 클릭하면 모달이 열리는지 확인

  - modal
    - [] 음식점을 추가하면 목록에 정상적으로 등록되는지 확인
    - [] 취소하기 버튼을 누르면 모달이 닫히고 입력값이 초기화되는지 확인
    - [] 필수 입력값이 누락되었을 때 경고 메시지가 뜨는지 확인
    - [] 참고 링크 입력값이 URL 형식이 아닐 경우 경고 메시지 확인
    - [] 새로고침했을 때, 추가한 음식점이 초기화되는지 확인
    - [] 화면 외부를 클릭했을 때 모달이 닫히고 입력 값이 초기화되는지 확인
    - [] Esc 키를 눌렀을 때 모달이 정상적으로 닫히는지 확인
