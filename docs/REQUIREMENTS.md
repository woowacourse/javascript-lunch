# 🎯 요구 사항

캠퍼스 주변의 점심 식사 스팟 목록을 관리하는 앱을 만든다.

## 음식점

- [x] 음식점을 추가할 수 있다.
  - 카테고리, 이름, 거리는 필수 정보다.
  - 설명, 참고 링크는 옵션이다. 정보가 없어도 음식점 추가가 가능하다.
  - 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
  - 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.
- [x] 자주 가는 음식점을 추가하고 목록으로 확인할 수 있다.
  - 음식점 목록에서 자주 가는 음식점을 추가할 수 있다.
  - 음식점 상세 정보에서 자주 가는 음식점으로 추가할 수 있다.
  - 자주 가는 음식점 탭에서 추가한 음식점 목록을 확인할 수 있다.

## 컴포넌트

## 범용 컴포넌트

- [x] Modal
  - 모달이 열고 닫히는 이벤트를 관리
- [x] Select
  - option들을 동적으로 생성

### 컴포넌트 + 기능

- [x] App
  - BookmarkTab, RestaurantFilters, RestaurantList 컴포넌트를을 참조한다.
  - RestaurantManager 도메인을 참조한다.
  - 앱의 localStorage, RestaurantManager, RestaurantList의 데이터 흐름을 조작하기 위해 관련한 이벤트 리스너를 관리한다.
    - RestaurantForm의 제출 이벤트를 관찰한다.
    - RestaurantFilters의 변경 이벤트를 관찰한다.
    - BookmarkTab의 변경 이벤트를 관찰한다.
    - BookmarkButton의 클릭 이벤트를 관찰한다.
    - RestaurantDetail의 삭제 이벤트를 관찰한다.
- [x] GNB
  - 앱의 navigation bar.
  - 음식점 추가 버튼을 누르면 음식점 추가 form이 modal 안에 열린다.
- [x] BookmarkTab
  - 즐겨찾기 여부로 음식점 리스트를 구분할 수 있는 탭
- [x] RestaurantForm
  - 음식점 추가를 위한 form.
  - 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
  - 유효하지 않은 링크가 입력되면 '유효하지 않은 링크입니다.'를 노출한다.
- [x] RestaurantList
  - App으로부터 전달 받은 데이터로 RestaurantItem 컴포넌트를 동적으로 생성한다.
- [x] RestaurantItem
  - RestaurantList로부터 전달 받은 데이터로 음식점 정보를 렌더링한다.
  - click 이벤트가 발생하면 모달을 열어 상세 정보를 보여준다.
  - 즐겨찾기 버튼으로 자주 가는 음식점을 설정할 수 있다.
- [x] CategoryIcon
  - 카테고리 정보를 받아 알맞은 이미지를 렌더링한다.
- [x] BookmarkButton
  - 버튼을 누르면 즐겨찾기 여부를 저장할 수 있다.
- [x] RestaurantDetail
  - RestaurantItem으로부터 전달 받은 데이터로 음식점 상세 정보를 렌더링한다.
  - 음식점 삭제 버튼과 모달 닫기 버튼이 있다.
