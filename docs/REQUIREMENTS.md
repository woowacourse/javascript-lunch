## 기능 구현 목록

### Domain

- [ ] 음식점을 추가하는 기능
- [ ] 음식점을 카테고리 별로 필터링하는 기능

- [ ] 음식점을 정렬하는 기능

  - [ ] 이름 순으로 정렬할 수 있다. (domain)
  - [ ] 거리 순으로 정렬할 수 있다. (domain)

- [ ] 입력 에러 처리

  - [ ] 카테고리 필수 입력 + ["한식", "중식", "일식", "아시안", "양식", "기타"] 중 하나가 아닐 경우 에러 - html select로 에러 검증
  - [ ] 이름 필수 입력 (공백, 특수문자 X)
  - [ ] 거리 필수 입력 + [5, 10, 15, 20, 25, 30] 중 하나가 아닐 경우 에러 - html select로 에러 검정
  - [ ] 참고 링크에 대한 입력 데이터 검증: 올바른 형식의 url이거나, 값이 비어있어야 한다.

### Domain 설계 + Component 구조 짜기

**Stores**
property: list: store []

method:

- 이름으로 정렬하는 기능
- 거리순으로 정렬하는 기능
- 음식점을 카테고리 별로 필터링 하는 기능
- store를 추가하는 기능

**Store({name, distance, category, 설명, 참조링크})**

property: name, distance, catgory, 설명, 참조링크

- get
  - name
  - distance
  - category
    ...

**Validate**

- validateName()
- validateDistance()
  - name
  - distance
    ...

뷰 -> 입력 -> Store({name, distance, category}) -> Stores.setStore(Store)

뷰 -> 이름 정렬한 거 보여줘 -> Stores.getSortNames() -> 뷰 나타내기

---
