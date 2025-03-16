import "./tabFilter.css";
import RestaurantList from "../../Restaurant/RestaurantList";

const createTabFilter = (restaurantList) => {
  const tap_container = document.querySelector(".tab-container");
  const tabFilter = `<div class="tab-button">
      <button class="tab-btn text-title" data-tab="allTab">모든 음식점</button>
      <button class="tab-btn text-title" data-tab="favoriteTab">자주 가는 음식점</button>
      <p id="tab-filter-result"></p>
  </div>
  `;
  tap_container.insertAdjacentHTML("beforeend", tabFilter);
  setActive();

  const tabButtons = document.querySelectorAll(".tab-btn");
  tabButtons.forEach((button) => {
    button.addEventListener("click", (event) => {
      const selectedTab = event.target.dataset.tab;
      tabButtons.forEach((button) => button.classList.remove("active"));
      event.target.classList.add("active");
      handleOnClick(selectedTab);
    });
  });

  function setActive() {
    if (restaurantList.selectedTab === "allTab") {
      document
        .querySelector('.tab-btn[data-tab="allTab"]')
        .classList.add("active");
    } else {
      document
        .querySelector('.tab-btn[data-tab="favoriteTab"]')
        .classList.add("active");
    }
  }

  function handleOnClick(selectedTab) {
    restaurantList.setSelectedTab(selectedTab);
    restaurantList.createRestaurantList();
  }
};

export default createTabFilter;
