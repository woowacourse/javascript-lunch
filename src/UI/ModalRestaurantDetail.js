import { $ } from "../utils/Dom";
import {
  stringifyJson,
  getRestaurantListFromLocalstorage,
} from "../utils/LocalStorage";
import { RESTAURANT } from "../utils/Constant"

export default class ModalRestaurantDetail {
  #template = `
    <div class="modal--detail">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
        <div class="modal-picture-favorite">
          <!-- 카테고리 사진 -->
          <div class="detail-item restaurant__category">
            <img class="category-icon modal-detail-restaurant__image">
          </div>

          <!-- 즐겨찾기 -->
          <div class="modla--restaurant_favorite">
          </div>
        </div>

          <!-- 음식점 이름 -->
          <div class="detail-item">
            <h3 class="restaurant__name  modal-detail-restaurant__name ntext-subtitle"></h3>
          </div>

          <!-- 거리 -->
          <div class="detail-item">
            <span class="restaurant__distance modal-detail-restaurant__distance text-body"></span>
          </div>

          <!-- 설명 -->
          <div class="detail-item">
            <p class="modal-detail-restaurant__description text-body"></p>
          </div>

          <!-- 링크 -->
          <div class="detail-item">
            <a class="modal-detail-restaurant__link"></a>
          </div>

          <!-- 취소/추가 버튼 -->
          <div class="button-container detail-button-container">
            <button type="button" class="button button--delete text-caption">삭제하기</button>
            <button type="button" class="button button--close text-caption">닫기</button>
          </div>
      </div>
    </div>
    `;

  constructor(restaurantList, restaurantRegistry) {
    this.restaurantList = restaurantList;
    this.restaurantRegistry = restaurantRegistry
  }
  render() {
    document.body.insertAdjacentHTML("beforeend", this.#template);
  }

  initializeButtonEvents() {
    $(".button--close").addEventListener("click", this.closeModalDetail);
    $(".button--delete").addEventListener(
      "click",()=>{
        this.restaurantList.deleteRestaurantElement();
        if ($(".favorite-restaurant").style.color === "rgb(236, 74, 10)") {
          const restaurantAll = getRestaurantListFromLocalstorage("favorite") || []
          console.log(restaurantAll)
          this.closeModalDetail();
          $(".restaurant-list").replaceChildren();
          this.attachRestaurantToRegistry(restaurantAll);
          return;
        }
        const foodCategory = localStorage.getItem("foodCategory") ?? "전체";
        const sortBy = localStorage.getItem("sort") ?? "name";
        this.restaurantList.filterCategory(foodCategory);
        this.restaurantList.filterBySort(sortBy, foodCategory);
        this.closeModalDetail();
      }
    );
  }

  attachRestaurantToRegistry(restaurantParsedInfo) {
    restaurantParsedInfo.forEach((value) => {
      this.restaurantRegistry.appendRestaurant(value);
    });
  }

  changeRestaurantInformation(event, restaurantInfo) {
    this.restaurantInfo = restaurantInfo
    const category = {
      한식: "./category-korean.png",
      일식: "./category-japanese.png",
      양식: "./category-western.png",
      중식: "./category-chinese.png",
      아시안: "./category-asian.png",
      기타: "./category-etc.png",
    };

    $(".modal--detail").id = restaurantInfo.id;

    $(".modal-detail-restaurant__image").setAttribute(
      "src",
      category[restaurantInfo.category]
    );
    $(".modal-detail-restaurant__image").setAttribute(
      "alt",
      restaurantInfo.category
    );

    $(".modal-detail-restaurant__name").textContent = restaurantInfo.name;
    $(
      ".modal-detail-restaurant__distance"
    ).textContent = `캠퍼스로부터 ${restaurantInfo.distance}분 내`;
    $(".modal-detail-restaurant__description").textContent =
      restaurantInfo.description;

    $(".modal-detail-restaurant__link").setAttribute(
      "href",
      restaurantInfo.link
    );
    $(".modal-detail-restaurant__link").textContent = restaurantInfo.link;

    $(`.modla--restaurant_favorite`).replaceChildren()
    $(`.modla--restaurant_favorite`).innerHTML += '<img src="./favorite-icon-lined.png"></img>'
    this.openModalDetail();

    const clickListImage = event.target.children[1].children[0].getAttribute("src")
    if(clickListImage === "./favorite-icon-filled.png") $(".modla--restaurant_favorite").children[0].setAttribute("src", "./favorite-icon-filled.png");
    if(clickListImage === "./favorite-icon-lined.png") $(".modla--restaurant_favorite").children[0].setAttribute("src", "./favorite-icon-lined.png");

    $(`.modla--restaurant_favorite`).children[0].addEventListener(
      "click", this.favoriteEvent
    );
  }

 clickModalFavorite(e, restaurantInfo){
    e.stopPropagation();
    if (e.target.getAttribute("src") === "./favorite-icon-filled.png") {
      const restaurantFavoriteList = getRestaurantListFromLocalstorage(RESTAURANT).map((restaurant)=>{
        if(restaurant.id === restaurantInfo.id) restaurant["favorite"]= "./favorite-icon-lined.png"
        return restaurant
      })
      localStorage.setItem("restaurants", stringifyJson(restaurantFavoriteList));
      const res = getRestaurantListFromLocalstorage("favorite") ?? [];
      const deletedRestaurantElementArray = res.filter((val) =>  {
        return val.id !== restaurantInfo.id});
      localStorage.setItem("favorite", stringifyJson(deletedRestaurantElementArray))
      $(`.restaurant_favorite${restaurantInfo.id}`).children[0].setAttribute("src", "./favorite-icon-lined.png");
      e.target.setAttribute("src", "./favorite-icon-lined.png");
    }
    else if (e.target.getAttribute("src") === "./favorite-icon-lined.png") {
      const favorite = []
      const restaurantFavoriteList = getRestaurantListFromLocalstorage(RESTAURANT).map((restaurant)=>{
        if(restaurant.id === restaurantInfo.id) restaurant["favorite"]= "./favorite-icon-filled.png"
        return restaurant
      })
      localStorage.setItem("restaurants", stringifyJson(restaurantFavoriteList));
      const favoriteList = getRestaurantListFromLocalstorage("favorite")
      if(favoriteList !== null) favoriteList.forEach((val)=>favorite.push(val))
      favorite.push(restaurantInfo);
      localStorage.setItem("favorite", stringifyJson(favorite));
      $(`.restaurant_favorite${restaurantInfo.id}`).children[0].setAttribute("src", "./favorite-icon-filled.png");
      e.target.setAttribute("src", "./favorite-icon-filled.png");
    }
  }

  favoriteEvent=(e)=>this.clickModalFavorite(e, this.restaurantInfo)

  openModalDetail() {
    $(".modal--detail").style.display = "block";
  }

  closeModalDetail=()=> {
    $(".modal--detail").style.display = "none";
    $(".modal--detail").removeAttribute('id');
  }
}
