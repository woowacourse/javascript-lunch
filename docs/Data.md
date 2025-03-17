# 1. 데이터 저장 방식

## 1.1. 음식점 데이터 (`restaurants`)

`restaurants: Restaurant[]`  
음식점 데이터는 각 음식점의 상세 정보를 포함합니다.

```ts
export const restaurants: Restaurant[] = [
  {
    id: "restaurant-1",
    category: "KOREAN",
    name: "피양콩할마니",
    distance: 10,
    description: "평양 출신의 할머니가 수십 년간 운영해온 비지 전문점...",
    link: "https://naver.me/G6DyD9tg",
  },
  {
    id: "restaurant-2",
    category: "CHINESE",
    name: "친친",
    distance: 5,
    description: "Since 2004 편리한 교통과 주차, 그리고 관록만큼 깊은 맛...",
    link: "https://naver.me/G6DyD9tg",
  },
  // 추가 데이터...
];
```

## 1.2. 즐겨찾기 데이터 (`favoriteIds`)

`favoriteIds: Restaurant["id"][]`

사용자가 즐겨찾기로 선택한 음식점들을 관리하기 위한 데이터입니다.

- 즐겨찾기 데이터는 음식점 전체 객체가 아닌, 음식점의 id 값만 배열에 저장합니다.
  - 음식점 객체 전체를 저장하는 대신, id만 저장하면 데이터의 크기가 줄어들고 관리가 쉬워집니다.
  - 음식점의 상세 정보는 별도의 restaurants 배열에 저장되어 있으므로, 즐겨찾기 목록은 해당 id를 참조하여 최신 정보를 불러올 수 있습니다.

<br>

# 2. localStorage 동기화

사용자가 상태를 변경할 때마다 해당 데이터를 `localStorage`에 저장하여, 새로고침이나 재방문 시에도 데이터가 유지되도록 합니다.

## 2.1. 저장 키

```ts
const STORAGE_KEYS = {
  RESTAURANTS: "restaurants",
  FAVORITE_IDS: "favoriteRestaurantIds",
  FILTERS: "filters",
  CURRENT_TAB: "currentTab",
} as const;
```

- restaurants: 음식점 목록 전체를 JSON 문자열로 저장합니다.
- favoriteRestaurantIds: 즐겨찾기로 선택한 음식점의 id 배열을 JSON 문자열로 저장합니다.
- filters: 카테고리 필터와 정렬 옵션(예: category, sortBy)을 저장합니다.
- currentTab: 현재 활성화된 탭(예: "ALL" 또는 "FAVORITE") 상태를 저장합니다.

## 2.2 동기화 방식

- 상태 업데이트 감시 (watchState):

  - 각 상태(예: restaurants, favoriteIds, categoryFilter, sortBy, currentTab)에 대해 변경 감시자를 등록합니다.

- 상태가 변경되면, 해당 값을 JSON 문자열로 변환하여 localStorage에 저장합니다.
  - 예를 들어, favoriteIds가 변경되면 storage.favoriteIds = this.getState().favoriteIds; 와 같이 업데이트하여, 새로고침해도 최신 즐겨찾기 정보가 유지되도록 합니다.
- 초기 로드: 애플리케이션 초기화 시, localStorage에 저장된 값이 있으면 이를 읽어 초기 상태를 설정합니다.
- 이를 통해 사용자가 마지막에 설정한 상태(음식점 목록, 즐겨찾기, 필터, 탭 등)가 재방문 시 그대로 복원됩니다.
