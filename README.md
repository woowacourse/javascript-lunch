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
 ┃ ┣ AddBtn
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
 ┃ ┣ enum.ts
 ┃ ┣ index.ts
 ┃ ┣ message.ts
 ┃ ┗ rule.ts
 ┣ data
 ┃ ┗ restaurantData.ts
 ┣ domains
 ┃ ┣ Restaurant.ts
 ┃ ┣ RestaurantList.ts
 ┃ ┗ index.ts
 ┣ services
 ┃ ┣ FilteringController.ts
 ┃ ┣ RestaurantListController.ts
 ┃ ┣ StoreAddBtnController.ts
 ┃ ┣ WebController.ts
 ┃ ┗ index.ts
 ┣ types
 ┃ ┣ addBtnType.ts
 ┃ ┣ dropBoxType.ts
 ┃ ┣ index.ts
 ┃ ┣ restaurantType.ts
 ┃ ┗ storageKeyType.ts
 ┣ custom.d.ts
 ┗ index.js
```

</div>
</details>
