## 프로그램 설명

점심 메뉴 추천 웹사이트

## 기능 요구사항

- [x] 음식점 목록 페이지 구현
- [x] 우측 상단의 추가 버튼을 눌러 모달창을 띄운다
- [x] 모달창에서 새로운 음식점 추가
  - [x] 카테고리, 거리는 셀렉트 박스를 사용
    - [x] 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택
    - [x] 거리는 5, 10, 15, 20, 30 중 하나를 선택
  - [x] 이름/설명/참고 링크는 텍스트 input을 사용
  - [x] 카테고리, 이름, 거리 입력 필수
- 입력값이 잘못되었을 때 사용자에게 알림
  - [x] 필수 입력값이 작성되지 않았을 경우 에러 메세지 출력
  - [x] 음식점 이름이 20자가 넘을 경우 에러 메세지 출력
  - [x] 음식점 설명이 200자가 넘을 경우 에러 메세지 출력
  - [x] 음식점 참고 링크가 링크 형식이 아닐 경우 에러 메세지 출력

## 파일 구조

```base
src
├── component
│   ├── button
│   │   ├── Button.js
│   │   ├── ButtonContainer.js
│   │   ├── IconButton.js
│   ├── input
│   │   ├── Input.js
│   │   ├── SelectInput.js
│   │   ├── TextareaInput.js
│   ├── layout
│   │   ├── Alert.js
│   │   ├── Header.js
│   │   ├── Modal.js
│   ├── FoodForm.js
│   ├── FoodItem.js
│   ├── FoodList.js
├── constants
│   ├── constants.js
│   ├── errorMessage.js
│   ├── systemMessage.js
├── css
│   ├── alert.css
│   ├── button.css
│   ├── filter.css
│   ├── foodItem.css
│   ├── form.css
│   ├── header.css
│   ├── modal.css
├── mock
│   ├── mockItem.js
├── pages
│   ├── FoodListPage.js
├── util
│   ├── alertError.js
│   ├── errorHandler.js
│   ├── getImgSrcAlt.js
│   ├── getInput.js
│   ├── modalHandler.js
│   ├── validate
│   │   ├── validateCondition.js
│   │   ├── validateFoodItem.js
├── main.js
```

- component : 재사용 가능한 UI 컴포넌트
- constants : 상수 값 및 에러 메세지
- css : 스타일(CSS) 파일을 모아둔 폴더
- mock : 페이지 로딩 시 기본적으로 들어있어야 할 음식점 이름 리스트
- page : 화면에 보일 페이지들을 모아둔 폴더
- util : utility 함수 모음 (공통 기능 핸들링)

## 📄 사용 예제
