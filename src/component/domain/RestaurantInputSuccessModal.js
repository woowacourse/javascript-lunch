import Modal from "../common/Modal";

const TEMPLATE = `
<h1>음식점 입력 성공!</h1>
<h3>전체 보기에서 확인하시겠습니까?</h3>
<div class="button-container">
  <button type="button" id="change-category-to-all" class="button button--primary text-caption">
    네
  </button>
  <button type="button" id="no-change-category" class="button button--secondary text-caption">
    아니오
  </button>
</div>
`;

const RestaurantInputSuccessModal = {
  create() {
    const restaurantInputSuccessModal = Modal.create("input-success-modal");

    Modal.setInnerHTML(restaurantInputSuccessModal, TEMPLATE);

    return restaurantInputSuccessModal;
  },
};

export default RestaurantInputSuccessModal;
