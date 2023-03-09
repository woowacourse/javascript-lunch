## 기능 구현 목록

### Domain

- [x] 음식점을 추가하는 기능
- [x] 음식점을 카테고리 별로 필터링하는 기능

- [x] 음식점을 정렬하는 기능

  - [x] 이름 순으로 정렬할 수 있다. (domain)
  - [x] 거리 순으로 정렬할 수 있다. (domain)

- [x] 입력 에러 처리

  - [x] 카테고리 필수 입력 + ["한식", "중식", "일식", "아시안", "양식", "기타"] 중 하나가 아닐 경우 에러 - html select로 에러 검증
  - [x] 이름 필수 입력 (공백만으로 이루어져 있는 경우는 안 됨)
  - [x] 거리 필수 입력 + [5, 10, 15, 20, 25, 30] 중 하나가 아닐 경우 에러 - html select로 에러 검정
  - [x] 참고 링크에 대한 입력 데이터 검증: 올바른 형식의 url이거나, 값이 비어있어야 한다.

- [ ] 음식점 삭제하는 기능

- [ ] 자주 가는 음식점을 정렬하는 기능

### Domain 설계

**Restaurant**

```
property {
  id: number
  category: RestaurantCategoryType;
  name: string;
  distance: string;
  description: string;
  link: string;
}
```

**Restaurants**
property: list: store []

method:

- 이름으로 정렬하는 기능
- 거리순으로 정렬하는 기능
- 음식점을 카테고리 별로 필터링 하는 기능
- store를 추가하는 기능

**Validate**

- validateName()
- validateDistance()
  - name
  - distance
    ...

뷰 -> 입력 -> Store({name, distance, category}) -> Stores.setStore(Store)

뷰 -> 이름 정렬한 거 보여줘 -> Stores.getSortNames() -> 뷰 나타내기

---

### Component 구조 짜기

- 전체 구조는 SPA(Single Page Application) 방식으로 짤 예정입니다.

- App

  - Header

  - RestaurantList -> 즐겨찾기 기능 추가

    - RestaurantItem

  - Selector

  - RestaurantAddModal

    - Button

  - RestaurantDetail (Modal 기능)

  - Tabs

    - Tab
