import Modal from "./Modal";

const restaurantDetailContent = document.createElement("div");
restaurantDetailContent.innerHTML = "<h2>레스토랑 상세 보기</h2>";

class RestaurantDetailModal extends Modal {
  constructor() {
    super({ child: restaurantDetailContent });
  }
}

export default RestaurantDetailModal;
