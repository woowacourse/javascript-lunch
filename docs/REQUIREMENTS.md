## 점심 뭐먹지 기능 요구 사항

- [x] 음식점 목록을 확인할 수 있다.
  - [x] 카테고리별로 필터링해서 확인할 수 있다.
  - [x] 이름순으로 정렬해서 확인할 수 있다.
  - [x] 거리순으로 정렬해서 확인할 수 있다.
- [x] 음식점 목록에 새로운 음식점을 추가할 수 있다.
  - [x] 음식점의 카테고리, 이름, 거리(도보 이동 시간), 설명, 참고 링크를 입력해서 추가할 수 있다.
  - [x] 카테고리, 거리는 셀렉트 박스, 이름/설명/참고 링크는 텍스트 인풋을 사용한다.
  - [x] 카테고리, 이름, 거리는 입력 필수.
    - [x] 카테고리는 "한식", "중식", "일식", "아시안", "양식", "기타" 중 하나를 선택한다.
    - [x] 거리는 캠퍼스로부터 도보로 걸리는 시간(분). 5, 10, 15, 20, 30 중 하나를 선택한다.
  - [x] 설명, 참고 링크는 옵션. 입력하지 않아도 음식점을 추가할 수 있어야 한다.
  - [x] 입력값이 잘못되었을 때 사용자에게 알려주는 방식은 자유롭게 구현한다.
- [x] 새로고침해도 추가한 음식점 정보들이 유지되어야 한다.

---

## 점심 뭐먹지 미션 기능 목록

# components

- 독립적이고 재사용가능한 ui 단위들을 분리하고 정의한다.
- 각 component가 맡는 역할, 이벤트를 처리한다.

1. NavBar

2. AddRestaurant

- 레스토랑 추가를 위한 ui와 인풋 태그들을 가진다.

3. BottomSheet

- 위로 올라갔다가 내려가는 애니메이션 효과를 가진다.

4. RestaurantItem

- 레스토랑 이름, 거리, 설명, 카테고리 정보를 담는다.

5. RestaurantList

- RestaurantItem을 리스트로 나열한다.

6. CategorySelectBox

- 카테고리를 선택한다.

7. SortingSelectBox

- 정렬순서를 선택한다.

8. TabBar

- 탭 메뉴를 선택한다.

9. RestaurantDetail

- 음식점 상세정보를 담는다.

# domain

## Controller

// state: list 화면에 보여지는 음식점 배열만을 가리킨다.
// localStorage: 화면에 상관없이 음식점 배열에 대한 모든 정보를 가리킨다.

1. state 관련 로직

- 하나만 존재하는 controller 인스턴스를 생성한다. (getInstance)
- 음식점 객체 배열을 반환한다. (getRestaurants)
- 선택된 음식점 객체의 index를 반환한다. (getSelectedRestaurantIndex)
- 선택된 음식점 객체를 반환한다. (getSelectedRestaurant)
- 선택된 음식점 객체의 index를 설정한다. (setSelectedRestaurantIndex)
- 즐겨찾기된 음식점 객체 배열을 설정한다. (setFavoriteRestaurantList)
- 음식점 객체들을 이름순 및 거리순으로 정렬한다. (sortRestaurants)
- 음식점 객체들을 카테고리별로 필터링한다. (filterRestaurants)
- 선택된 음식점 객체의 즐겨찾기 속성을 변경한다. (toggleFavorite)
- 선택된 음식점 객체를 삭제한다. (deleteRestaurant)

2. localStorage 관련 로직

- localSorage에 있는 음식점 객체 배열을 반환한다. (getLocalStorage)
- 음식점 객체 배열을 localStorage에 저장한다. (setLocalStorage)
- 새로운 음식점 객체를 localStorage에 추가한다. (addRestaurant)

## restaurants

- restaurants state가 변경될때마다 RestaurantList 컴포넌트를 자동으로 재렌더링한다.

## inputValidator

- 이름, 참고 링크에 대한 유효성을 검사한다.
