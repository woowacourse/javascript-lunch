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
  - [x] title
  - [x] 카테고리(select)
    - ["한식", "중식", "일식", "아시안", "양식", "기타"]
  - [x] 이름 (input, type: text)
  - [x] 거리(분) (select)
    - [5, 10, 15, 20, 30]
  - [x] 설명 (input, type: text)
  - [x] 참고 링크 (input, type: text)
  - [x] 취소하기 버튼 (button)
  - [x] 추가하기 버튼 (button)

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
- [x] 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화하는 기능

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

- E2E 테스트

  - [] 음식점 추가 기능 테스트

    - [x] [정상] 음식점 추가 - 모든 필드 입력 후 추가하기
      - 음식점 추가하기 버튼 클릭
      - 모달이 열리는지 확인
      - 카테고리, 이름, 거리, 설명, 참고 링크 입력
      - 추가하기 버튼 클릭
      - 음식점 리스트에 해당 아이템이 추가되었는지 확인
    - [] [정상] 필수 입력값만 입력 후 추가하기
      - 음식점 추가하기 버튼 클릭
      - 모달이 열리는지 확인
      - 카테고리, 이름, 거리 입력
      - 추가하기 버튼 클릭
      - 음식점 리스트에 해당 아이템이 추가되었는지 확인

  - [] 음식점 추가 취소 기능 테스트

    - [] [정상] 음식점 추가 중 취소 버튼 클릭

      - 음식점 추가하기 버튼 클릭
      - 모달이 열리는지 확인
      - 카테고리, 이름, 거리, 설명, 참고 링크 입력
      - 취소하기 버튼 클릭
      - 모달이 닫혔는지 확인
      - 음식점 리스트에 새로운 아이템이 추가되지 않았는지 확인

    - [] [정상] ESC 키 입력 시 모달 닫기

      - 음식점 추가하기 버튼 클릭
      - 모달이 열리는지 확인
      - ESC 키 입력
      - 모달이 닫혔는지 확인
      - 음식점 리스트에 새로운 아이템이 추가되지 않았는지 확인

    - [] [정상] 모달 외부 클릭 시 닫기

      - 음식점 추가하기 버튼 클릭
      - 모달이 열리는지 확인
      - 모달 바깥을 클릭
      - 모달이 닫혔는지 확인
      - 음식점 리스트에 새로운 아이템이 추가되지 않았는지 확인

    - [] [정상] 취소 후 다시 모달 열었을 때 입력값 초기화 확인
      - 음식점 추가하기 버튼 클릭
      - 모달이 열리는지 확인
      - 카테고리, 이름, 거리, 설명, 참고 링크 입력
      - 취소하기 버튼 클릭
      - 모달이 닫혔는지 확인
      - 음식점 추가하기 버튼 다시 클릭
      - 모달이 열렸을 때 입력값이 초기화되었는지 확인
