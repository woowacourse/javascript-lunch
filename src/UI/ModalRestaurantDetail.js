import { $ } from "../utils/Dom";

export default class ModalRestaurantDetail {
  #template = `
    <div class="modal--detail">
      <div class="modal-backdrop"></div>
      <div class="modal-container">
          <!-- 카테고리 사진 -->
          <div class="detail-item restaurant__category">
            <img class="category-icon modal-detail-restaurant__image">
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

  constructor(restaurantList) {
    this.restaurantList = restaurantList;
  }
  render() {
    document.body.insertAdjacentHTML("beforeend", this.#template);
  }

  changeRestaurantInformation(restaurantInfo) {
    const category = {
      한식: "./category-korean.png",
      일식: "./category-japanese.png",
      양식: "./category-western.png",
      중식: "./category-chinese.png",
      아시안: "./category-asian.png",
      기타: "./category-etc.png",
    };

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

    this.openModalDetail();
  }

  openModalDetail() {
    $(".modal--detail").style.display = "block";
  }
}
