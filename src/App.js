import Header from "./components/Header.js";
import RestaurantList from "./components/RestaurantList.js";
import {
  filterAndSortRestaurants,
  restaurants,
} from "./domains/restaurants.ts";
import AddRestaurantModal from "./components/modal/AddRestaurantModal/index.js";
import RestaurantItem from "./components/RestaurantItem.js";
import FilterBar from "./components/FilterBar.js";
import TabBarView from "./components/TabBarView.js";

class App {
  #restaurants;
  #$target;
  #selectedCategory = "전체";
  #selectedSorting = "name";

  constructor($target) {
    this.#$target = $target;
    this.#restaurants = restaurants;

    this.#$target.insertAdjacentHTML("beforeend", this.#template());
    this.#renderMainArea();
    this.#mount();
  }

  #template() {
    return /*html*/ `
      ${Header()}
      ${TabBarView()}
      <main></main>
      <div id="modal"></div>
    `;
  }

  #mount() {
    const $main = document.querySelector("main");
    const $gnbButton = this.#$target.querySelector(".gnb__button");
    const $listTab = this.#$target.querySelector("#list-tab");
    const $favoriteTab = this.#$target.querySelector("#favorite-tab");

    $listTab.addEventListener("click", () => {
      $listTab.classList.add("active");
      $favoriteTab.classList.remove("active");
      this.#renderMainArea();
    });
    $favoriteTab.addEventListener("click", () => {
      $listTab.classList.remove("active");
      $favoriteTab.classList.add("active");
      $main.replaceChildren();
      // TODO: 즐겨찾기 목록을 렌더링하는 코드 작성.
    });

    const $modal = new AddRestaurantModal(
      document.querySelector("#modal"),
      this.#addRestaurant.bind(this)
    );

    $gnbButton.addEventListener("click", () => {
      $modal.open();
    });
  }

  #renderMainArea() {
    const $main = document.querySelector("main");

    new FilterBar($main, {
      onCategoryChange: (selected) => {
        this.#selectedCategory = selected;
        this.#renderRestaurantList();
      },
      onSortingChange: (selected) => {
        this.#selectedSorting = selected;
        this.#renderRestaurantList();
      },
    });

    this.#renderRestaurantList();
  }

  #renderRestaurantList() {
    // 1) 필터 + 정렬(도메인 로직)
    const filtered = filterAndSortRestaurants(
      this.#restaurants,
      this.#selectedCategory,
      this.#selectedSorting
    );

    // 2) "즐겨찾기 토글" 콜백 정의
    const onToggleFavorite = (clickedId) => {
      // restaurants 배열에서 name이 clickedName인 녀석을 찾아서 isFavorite 토글
      const target = this.#restaurants.find(
        (restaurant) => restaurant.id === Number(clickedId)
      );
      if (!target) return;
      target.isFavorite = !target.isFavorite;

      // 다시 리스트 렌더링해서 UI 반영
      this.#renderRestaurantList();
    };

    // 3) 새로운 RestaurantList DOM 생성 (filtered + onToggleFavorite)
    const $newList = RestaurantList(filtered, onToggleFavorite);

    // 4) 기존 리스트와 교체
    const $main = document.querySelector("main");
    const $oldContainer = $main.querySelector(".restaurant-list-container");

    if ($oldContainer) {
      $main.replaceChild($newList, $oldContainer);
    } else {
      $main.appendChild($newList);
    }
  }

  #addRestaurant(newRestaurant) {
    this.#restaurants.push(newRestaurant);
    this.#renderRestaurantList();
  }
}

export default App;
