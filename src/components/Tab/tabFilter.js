import "./tabFilter.css";

const createTabFilter = () => {
  const tap_container = document.querySelector(".tab-container");
  const tabFilter = `<div class="tab-button">
       <button class="tab-btn text-title" data-tab="allTab">모든 음식점</button>
      <button class="tab-btn text-title" data-tab="favoriteTab">자주 가는 음식점</button>
  </div>
  `;
  tap_container.insertAdjacentHTML("beforeend", tabFilter);
};

export default createTabFilter;
