# 기능 목록

## 음식점 목록

- [x] 음식점 목록을 반환한다.
- [x] 카테고리별로 필터링해서 반환한다.
- [x] 이름순/거리순으로 정렬해서 반환한다.
- [x] 음식점 목록에 새로운 음식점을 추가할 수 있다.

## 음식점

- [x] 카테고리(필수) - "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나
- [x] 이름(필수) - 문자열
- [x] 거리(필수) - 5, 10, 15, 20, 30 중 하나
- [x] 설명(옵션) - 문자열
- [x] 참고 링크(옵션) - 링크

## UI

- [x] RestaurantListLayout
  - [x] header
    - [x] title
    - [x] add restaurant button
      - click event: AddRestaurantModal 띄우기
  - [x] main
    - [x] RestaurantOptionSection
      - [x] filter select
        - select event: 해당 value에 맞도록 필터링 -> RestaurantListSection에 반영
      - [x] sort select
        - select event: 해당 value에 맞도록 정렬 -> RestaurantListSection에 반영
    - [x] RestaurantListSection
      - [x] RestaurantItem
- [x] AddRestaurantModal
  - [x] AddRestaurantForm
    - [x] form title
    - [x] category select
    - [x] name input
    - [x] distance select
    - [x] description input
    - [x] link input
    - [x] cancel button
      - click event: AddRestaurantModal 닫기
    - [x] submit button
      - submit event: 음식점 추가 및 RestaurantListSection에 반영
- [x] 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 -> alert

## 기타

- [x] 새로고침해도 추가한 음식점 정보들이 유지된다(localStorage).
