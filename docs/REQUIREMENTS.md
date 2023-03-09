## 구현기능목록

### 음식점 목록 조회

- [x] 사용자가 음식점 목록을 확인할 수 있다.
  - [x] 음식점 목록은 브라우저에서 불러온다.
- [x] 음식점 목록을 카테고리별로 필터링 할 수 있다.
  - [x] 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택할 수 있다.
- [x] 음식점 목록을 정렬 할 수 있다.
  - [x] 이름순으로 정렬
  - [x] 거리순으로 정렬

### 음식점 추가

- [x] 음식점의 정보를 추가할 수 있다.
  - [x] 카테고리
    - [x] 필수 입력
    - [x] "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 셀렉트 박스로 선택
  - [x] 이름
    - [x] 필수 입력
    - [x] 텍스트 입력
  - [x] 거리(도보 이동 시간)
    - [x] 필수 입력
    - [x] 5, 10, 15, 20, 30 중 하나를 셀렉트 박스로 선택
  - [x] 설명
    - [x] 텍스트 입력
  - [x] 참고 링크
    - [x] 텍스트 입력
- [x] 추가한 음식점 정보를 브라우저에 저장한다.
- [x] 레스토랑 클릭시 상세정보 모달 띄우기
- [x] 즐겨찾기 버튼 기능 구현
- [x] 음식점 상세정보에서 삭제기능 구현

## 파일구조

```bash
javascript-lunch
├─ docs
│  └─ REQUIREMENTS.md
├─ index.html
├─ src
│  ├─ components
│  │  ├─ Filter.js
│  │  ├─ Header.js
│  │  ├─ Modal.js
│  │  ├─ Restaurant.js
│  │  └─ RestaurantList.js
│  ├─ core
│  │  ├─ Component.js
│  ├─ domain
│  │  ├─ RestaurantFilter.ts
│  │  └─ RestaurantRepository.ts
│  ├─ index.js
│  ├─ App.js
│  └─ util
└─ templates

```
