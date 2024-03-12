# javascript-lunch

우아한테크코스 레벨1 점심 뭐 먹지 미션

## 배포 페이지

[🖥️ 깃허브 페이지 바로가기](https://badahertz52.github.io/javascript-lunch/dist/)

## 설치

```dash
npm i
```

## 빌드

```dash
npm run build
```

## 테스트

```dash
//jest 테스트

npm run jest-test
```

## 구현

<img src="./lunch_step1.gif" alt="미션- 점심 뭐 먹지 :1단계 구현"  height="350px"/>

## 폴더,파일 구조

### 폴더

| 폴더       | 설명                                                    |
| ---------- | ------------------------------------------------------- |
| assets     | css(css 상수, 공통적으로 들어가는 스타일 관리),svg 관리 |
| components | 커스텀 웹 컴포넌트를 폴더별로 ts,css 관리               |
| constants  | 상수, enum 관리                                         |
| data       | 기본 음식적 목록 데이터 관리                            |
| domains    | 도메인 모듈 관리                                        |
| services   | 도메인과 뷰를 연결하는 컨트롤러 관리                    |
| types      | 타입 관리                                               |

### 파일 구조

<details>
<summary>🗂️ 파일 구조 보기</summary>
<div markdown="1">

```
src
 ┣ assets
 ┃ ┣ css
 ┃ ┃ ┣ main.css
 ┃ ┃ ┣ style-constants.css
 ┃ ┃ ┗ topbar.css
 ┃ ┗ svg
 ┃ ┃ ┣ add-button.svg
 ┃ ┃ ┣ category-asian.svg
 ┃ ┃ ┣ category-chinese.svg
 ┃ ┃ ┣ category-etc.svg
 ┃ ┃ ┣ category-japanese.svg
 ┃ ┃ ┣ category-korean.svg
 ┃ ┃ ┣ category-western.svg
 ┃ ┃ ┣ down-arrow.svg
 ┃ ┃ ┣ favorite-icon-filled.svg
 ┃ ┃ ┣ favorite-icon-lined.svg
 ┃ ┃ ┗ up-arrow.svg
 ┣ components
 ┃ ┣ AddStoreBtn
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ CategoryIcon
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ CustomInput
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ CustomModal
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ CustomTextarea
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ DefaultBtn
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ DropBox
 ┃ ┃ ┣ DropBoxInnerHtmlMaker.ts
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ ErrorMessageBox
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┣ FormInput
 ┃ ┃ ┗ index.ts
 ┃ ┣ FormTextField
 ┃ ┃ ┗ index.ts
 ┃ ┣ Restaurant
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┃ ┗ RestaurantFormModalInner
 ┃ ┃ ┣ index.ts
 ┃ ┃ ┗ style.css
 ┣ constants
 ┃ ┣ dropBox.ts
 ┃ ┣ index.ts
 ┃ ┣ message.ts
 ┃ ┣ rule.ts
 ┃ ┗ storageKey.ts
 ┣ data
 ┃ ┗ restaurantData.ts
 ┣ domains
 ┃ ┣ index.ts
 ┃ ┣ Restaurant.ts
 ┃ ┗ RestaurantList.ts
 ┣ services
 ┃ ┣ FilteringController.ts
 ┃ ┣ index.ts
 ┃ ┣ RestaurantListController.ts
 ┃ ┗ WebController.ts
 ┣ types
 ┃ ┗ index.ts
 ┣ utils
 ┃ ┗ index.ts
 ┣ custom.d.ts
 ┗ index.js
```

</div>
</details>

### 컴포넌트 설명

| 컴포넌트                 | 설명                                                                                                                                       |
| ------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------ |
| AddStoreBtn              | 음식점 추가 버튼                                                                                                                           |
| CategoryIcon             | 음식점 카테고리에 따른 아이콘                                                                                                              |
| CustomInput              | XSS를 방지하는 input                                                                                                                       |
| CustomModal              | 모달                                                                                                                                       |
| CustomTextarea           | XSS를 방지하는 textarea                                                                                                                    |
| DefaultBtn               | 기본적으로 사용되는 버튼 형태                                                                                                              |
| DropBox                  | 옵션들을 선택 가능한 select 드롭 박스                                                                                                      |
| ErrorMessageBox          | 에러 메세지                                                                                                                                |
| FormInput                | FormTextField 를 상속받아서, input을 통한 입력값을 받고 입력값에 대한 오류 메세지를 보여주는 컴포넌트                                      |
| FormTextField            | 입력값의 오류 여부에 따라 오류 메세지를 입력란 하위에 보여주는 컴포넌트로, 이를 상속받아서 input,textarea에 대한 컴포넌트로 적용할 수 있음 |
| RestaurantComponent      | 음식점 정보를 담긴 컴포넌트                                                                                                                |
| RestaurantFormModalInner | 음식점 추가에 대한 모달 내의 입력폼                                                                                                        |
