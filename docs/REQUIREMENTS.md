# 기능 목록

## 음식점 목록

- [x] 음식점 목록을 반환한다.
  - [x] 카테고리별로 필터링해서 반환한다.
  - [x] 이름순/거리순으로 정렬해서 반환한다.
  - [x] (option) 자주가는 음식점만 필터링해서 반환한다.
- [x] 음식점 목록에 새로운 음식점을 추가한다.
- [x] 음식점을 반환한다.
- [x] 음식점 목록에서 음식점을 제거한다.
- [x] 음식점을 [자주가는 음식점/자주가지 않는 음식점]으로 변경한다.

## 음식점

- [x] 카테고리(필수) - "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나
- [x] 이름(필수) - 문자열
- [x] 거리(필수) - 5, 10, 15, 20, 30 중 하나
- [x] 설명(옵션) - 문자열
- [x] 참고 링크(옵션) - 링크
- [x] isGoTo(필수) - 자주가는 음식점인지 여부 (boolean)
- [x] id(필수) - unique key

## UI

- [ ] RestaurantListView
  - [x] header
    - [x] add restaurant button
      - click event: RestaurantFormModal 띄우기
  - [ ] main
    - [ ] tab: 모든 음식점 | 자주가는 음식점
      - 모든 음식점
        - [x] RestaurantSelectSection
          - [x] category select
            - select event: 해당 value에 맞도록 필터링 -> RestaurantListSection에 반영
          - [x] sort select
            - select event: 해당 value에 맞도록 정렬 -> RestaurantListSection에 반영
        - [ ] RestaurantListSection
          - [ ] RestaurantItem
            - [ ] isGoTo button
              - click event: toggle (domain + ui)
      - 자주가는 음식점
        - [ ] RestaurantListSection
          - [ ] RestaurantItem
            - [ ] isGoTo button
              - click event: toggle (domain + ui)
- [x] RestaurantFormModal
  - [x] AddRestaurantForm
    - [x] cancel button
      - click event: RestaurantFormModal 닫기
    - [x] submit button
      - submit event: 음식점 추가 및 RestaurantListSection에 반영
- [ ] RestaurantDetailModal
  - [ ] remove button
    - click event: 해당 음식점 삭제, 모달 닫기, 음식점 목록 불러오기
  - [ ] cancel button
    - click event: 모달 닫기
    - [ ] isGoTo button
    - click event: toggle (domain + ui)
- [x] 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 -> alert

## 기타

- [x] 새로고침해도 추가한 음식점 정보들이 유지된다(localStorage).
