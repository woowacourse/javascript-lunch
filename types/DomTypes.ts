// 각 레스토랑
export interface RestaurantElement extends HTMLElement {
  dataset:{
    restaurantId : string;
    category? : string;
    favorites? : string;
  }
}

// 관심 버튼
export interface FavoriteButtonElement extends HTMLElement{
  dataset : {
    restaurantId : string;
  }
}
// 탭버튼
export interface TabButton extends HTMLElement{
  dataset: {
    tab: string;
  }

}