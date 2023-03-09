customElements.define(
  'restaurant-detail-modal',
  class RestaurantDetailModal extends HTMLElement {
    categories = {
      한식: 'korean',
      중식: 'chinese',
      일식: 'japanese',
      아시안: 'asian',
      양식: 'western',
      기타: 'etc',
    };

    constructor() {
      super();
    }

    render(restaurant) {
      this.innerHTML = /* html */ `
      <dialog class="modal">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            <div id="restaurant__image__area">
              <div class="restaurant__category">
                <img src="./category-${this.categories[restaurant.category]}.png">
              </div>
              <img src="./favorite-icon-${
                restaurant.favorite === 'true' ? 'filled' : 'lined'
              }.png" alt="즐겨찾기 ${
        restaurant.favorite === 'true' ? '삭제' : '추가'
      }" class="favorite-icon">
          </div>
          <h2 id="restaurant-detail-modal-title" class="text-title">${restaurant.name}</h2>
          <span class="restaurant__distance text-body">캠퍼스부터 ${restaurant.distance}분 내</span>
          <p class="text-body">${restaurant.description}</p>
          <div id="link-container">
            <a href="${restaurant.link}">${restaurant.link ?? ''}</a>
          </div>
            <div class="button-container">
              <button type="button" class="button button--secondary text-caption cancel-button">삭제하기</button>
              <button class="button button--primary text-caption">닫기</button>
            </div>
          </form>
        </div>
      </dialog>`;
    }

    openModal() {
      this.querySelector('.modal').showModal();
    }

    closeModal() {
      this.querySelector('.modal').close();
    }
  }
);
