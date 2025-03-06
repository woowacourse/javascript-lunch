# 🎯 기능 요구 사항

점심 식사 스팟 목록을 관리하는 앱을 만든다.

- 음식점 목록 페이지를 화면과 같이 구성한다.
- 음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄우면, 새로운 음식점을 추가할 수 있다.
  - 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.
  - 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
  - 카테고리, 이름, 거리는 입력 필수.
    - 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
    - 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.
  - 설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있어야 한다.
  - 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 자유롭게 구현한다.
- 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.

# 구현할 기능 목록

### 입력

- [x] 가게 카테고리 선택 (필수)
  - [x] 아무것도 선택되지 않으면 안된다.
  - [x] 추가하기 버튼이 눌렸을때, "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나 선택
- [x] 가게 이름 입력 (필수)
  - [x] 이름은 빈 값일 수 없다.
  - [x] 이름은 1글자 이상 20글자 이하여야 한다.
- [x] 가게 거리 선택 (필수)
  - [x] 아무것도 선택되지 않으면 안된다.
  - [x] 추가하기 버튼이 눌렸을때, 5, 1-, 15, 20, 30 중 하나 선택
- [x] 가게 설명 입력
  - [x] 설명은 200자 이내여야 한다.
- [x] 가게 참고 링크 입력
  - [x] 프로토콜(https:// or http://)이 접두사로 붙어야 한다.

### 출력

- [x] 헤더 (제목, 목록 추가 버튼)
  - [x] 목록 추가 버튼 클릭시, 모달창 출력
- [x] 가게 리스트 출력
  - [x] 가게 카테고리 아이콘 출력
  - [x] 가게 이름 출력
  - [x] 가게 거리 출력
  - [x] 가게 설명 출력

### 모달 이벤트

- [ ] 취소하기
  - [x] 버튼 클릭시, 초기화 & 모달 제거
  - [ ] esc 입력시, 초기화 & 모달 제거
  - [ ] 백그라운드 클릭시, 초기화 & 모달 제거
- [x] 추가하기
  - [x] 새로운 식당 리스트에 추가

# 구현할 컴포넌트 목록

### 그 외

- [x] 헤더 : header
- [x] 버튼 : common-button

### 가게 목록

- [x] 가게 목록 아이템 : restaurantItem
  - [x] 가게 이름, 거리, 설명: restaurantInfo
    - [x] 가게 이름 : restaurantName
    - [x] 가게 거리 : restaurantDistance
    - [x] 가게 설명 : restaurantDescriptions
  - [x] 가게 아이콘: restaurantIcon

### 모달

- [x] 드롭다운 : input-dropdown
  - [x] 카테고리 : category-dropdown
  - [x] 거리 : distance-dropdown
- [x] 입력 (이름, 링크) : input-short-text
- [x] 입력 (설명) : input-long-text
- [x] 입력 아래 설명 : input-descripttion
- [x] 입력 서브타이틀: input-title

# 프로젝트 구조
