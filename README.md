# javascript-lunch

## 기능 요구 사항

점심 식사 스팟 목록을 관리하는 앱을 만든다.

- [x] 음식점 목록 페이지를 화면과 같이 구성한다.
- [x] 음식점 목록에서 우측 상단의 추가 버튼을 눌러 모달 창을 띄우면, 새로운 음식점을 추가할 수 있다.
  - [x] 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.
  - [x] 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
    - [x] 카테고리, 이름, 거리는 입력 필수.
    - [x] 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
    - [x] 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.
  - [x] 설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있어야 한다.
  - [x] 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 자유롭게 구현한다.
- [x] 새로고침 시 이전에 추가한 새로운 음식점 정보는 초기화된다.

UI

- 필요에 따라 예제로 주어진 템플릿을 활용한다.
  - 원한다면 직접 구현한다.
  - 수정이 필요한 부분이 있다면 수정하여 활용한다.
- 구체화한 요구 사항에 따라 추가로 필요한 UI가 있다면 스스로 적절히 판단하여 구현한다.

## 구현 목록

- [x] 각 컴포넌트별로 나눈다.
- [x] 새로운 음식점을 추가할 수 있다.
  - [x] 입력값이 잘못되었을 때 화면에 에러를 출력한다.

### 에러처리

- [x] 카테고리, 이름, 거리는 빈값이 올 수 없다.

### 리팩토링

- [x] 컴포넌트 variant 설정
- [x] 컴포넌트 구조 재설계 및 적용
- [x] CSS 분리
- [x] 상수화 적용

### 테스트 코드

- [x] E2E 테스트 코드 작성

## 컴포넌트 폴더 구조

```
components
├── 📂 common
│ ├── 📂 bottomSheetBase
│ │ ├── BottomSheetBase.js
│ │ └── bottomSheetBase.css
│ ├── 📂 button
│ │ ├── Button.js
│ │ └── button.css
│ └── 📂 selectBox
│   └── SelectBox.js
├── 📂 header
│ ├── Header.js
│ └── header.css
├── 📂 restaurantFormSection
│ ├── 📂 categorySelect
│ │ └── CategorySelect.js
│ ├── 📂 descriptionInput
│ │ └── DescriptionInput.js
│ ├── 📂 distanceSelect
│ │ └── DistanceSelect.js
│ ├── 📂 linkInput
│ │ └── LinkInput.js
│ ├── 📂 restaurantForm
│ │ ├── RestaurantForm.js
│ │ └── restaurantForm.css
│ └── 📂 restaurantNameInput
│   └── RestaurantNameInput.js
└── 📂 restaurantListSection
  ├── 📂 restaurantList
  │ ├── RestaurantList.js
  │ └── restaurantList.css
  └── 📂 restaurantListItem
    ├── RestaurantListItem.js
    └── restaurantListItem.css
```
