import RestaurantDetailModal from "./modal/RestaurantDetailModal/index.js";
import RestaurantItem from "./RestaurantItem.js";

const RestaurantList = (
  restaurants,
  { onToggleFavorite, onDeleteRestaurant }
) => {
  // 1) 템플릿 문자열을 만들되, map으로 각 아이템을 HTML화
  const htmlString = /* html */ `
    <section class="restaurant-list-container">
      <ul id="restaurant-list" class="restaurant-list" data-testid="restaurant-list">
        ${restaurants.map(RestaurantItem).join("")}
      </ul>
    </section>
  `;

  // 2) 문자열 → DOM 변환
  const $template = document.createElement("template");
  $template.innerHTML = htmlString.trim();
  const $element = $template.content.firstElementChild; // <section> 노드

  // 3) 즐겨찾기 아이콘 클릭 시 처리 (이벤트 위임)
  const $ul = $element.querySelector("#restaurant-list");

  $ul.addEventListener("click", (event) => {
    const $target = event.target;

    // (예) .favorite-icon 클래스를 클릭했을 때만 반응
    if ($target.classList.contains("favorite-icon")) {
      // 어떤 아이템이 클릭됐는지 찾기
      const $li = $target.closest(".restaurant");
      if (!$li) return;

      // data-id 가져오기
      const id = $li.dataset.id;

      // 부모(App) 쪽에 "이 name인 레스토랑의 favorite를 토글해줘!"라고 콜백
      onToggleFavorite?.(id);
      return;
    }

    const $li = $target.closest(".restaurant");
    if (!$li) return;

    const $detailModal = new RestaurantDetailModal(
      document.querySelector("#modal"),
      {
        restaurant: restaurants.find(
          (restaurant) => restaurant.id === $li.dataset.id
        ),
        onToggleFavorite,
        onDeleteRestaurant,
      }
    );

    $detailModal.open();
  });

  return $element;
};

export default RestaurantList;
