# javascript-lunch

우아한테크코스 레벨1 점심 뭐 먹지 미션

## [데모 페이지](https://suyoungj.github.io/javascript-lunch/)

---

## 실행 방법

```
// 저장소 클론
git clone -b step2 --single-branch https://github.com/suyoungj/javascript-lunch.git

// 패키지 설치
npm i

// 애플리케이션 실행
npm start

// Unit 테스트 실행
npm run test-unit

// E2E 테스트 실행
npm run test-e2e
```

## 기능 목록

- ### 음식점 목록 확인

  - 카테고리별 필터링
  - 이름순/거리순 정렬

- ### 새로운 음식점 추가

  - 카테고리, 이름, 거리, 설명, 링크를 입력하여 추가 가능
  - 카테고리, 이름, 거리는 필수 입력 항목

- ### 음식점 상세 정보 확인

  - 카테고리, 이름, 거리, 설명, 참고 링크 확인 가능

- ### 음식점 삭제

  - 음식점 상세 정보 모달에서 삭제 가능

- ### 자주 가는 음식점 등록 및 해제

  - 음식점 목록에서 자주 가는 음식점 등록/해제 가능
  - 음식점 상세 정보 모달에서 자주 가는 음식점 등록/해제 가능
  - 자주 가는 음식점 탭에서 등록된 음식점 목록 확인 가능

- `localStorage`를 활용하여 새로고침 시에도 데이터 유지

---

## 컴포넌트 설계

![1677829849511](https://user-images.githubusercontent.com/19235163/222662791-ba10e537-b470-42ba-8d12-3a10558d748a.jpg)

---

## 디렉터리 구조도

```
.
├── LunchMenuApp.js
│
├── components
│   ├── RestaurantDetailModal.js
│   ├── RestaurantFilter.js
│   ├── RestaurantList.js
│   ├── RestaurantListItem.js
│   ├── RestaurantRegisterModal.js
│   ├── RestaurantTab.js
│   └── common
│       └── CustomModal.js
│
├── css
│   ├── app.css
│   ├── index.css
│   ├── modal.css
│   ├── palette.css
│   ├── reset.css
│   ├── typo.css
│   └── utils.css
│
├── domain
│   ├── constants.ts
│   ├── restaurantManager.ts
│   └── sampleRestaurants.ts
│
├── icons
│   ├── category.ts
│   └── favorite.ts
│
├── index.js
│
└── utils
    ├── dom.ts
    ├── localStorage.ts
    └── uuid.ts
```
