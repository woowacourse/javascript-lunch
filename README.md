# javascript-lunch

우아한테크코스 레벨1 점심 뭐 먹지 미션

## [데모 페이지](https://suyoungj.github.io/javascript-lunch/)

## 페어 : 파인, 유스

---

## 실행 방법

```
// 저장소 클론
git clone -b step1 --single-branch https://github.com/suyoungj/javascript-lunch.git

// 패키지 설치
npm i

// 애플리케이션 실행
npm start

// 테스트 실행
npm run test-unit
```

## 기능 목록

- ### 음식점 목록 확인

  - 카테고리별 필터링
  - 이름순/거리순 정렬

- ### 새로운 음식점 추가

  - 카테고리, 이름, 거리, 설명, 링크를 입력하여 추가 가능
  - 카테고리, 이름, 거리는 필수 입력 항목

- `localStorage`를 활용하여 새로고침 시에도 데이터 유지

---

## 컴포넌트 설계

![1677829849511](https://user-images.githubusercontent.com/19235163/222662791-ba10e537-b470-42ba-8d12-3a10558d748a.jpg)

---

## 디렉터리 구조도

```
.
├── LunchMenuApp.js
├── components
│   ├── RestaurantFilter.js
│   ├── RestaurantList.js
│   ├── RestaurantListItem.js
│   └── RestaurantRegisterModal.js
├── domain
│   ├── restaurants.ts
│   └── sampleRestaurants.ts
├── index.js
└── utils
    ├── dom.js
    └── localStorage.js
```
