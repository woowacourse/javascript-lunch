import CustomElement from '../CustomElement';

class RestaurantDetailModal extends CustomElement {
  private get name() {
    return this.getAttribute('name');
  }

  private get distanceByMinutes() {
    return this.getAttribute('distanceByMinutes');
  }

  private get description() {
    return this.getAttribute('description');
  }

  private get category() {
    return this.getAttribute('category');
  }

  private get referenceUrl() {
    return this.getAttribute('referenceUrl');
  }

  private get isFavorite() {
    return this.hasAttribute('favorite');
  }

  renderTemplate = () => {
    return `
        <style>
          .restaurant-detail-container {
            display: grid;
            row-gap: 16px;
          }

          .detail-top-contents {
            display: flex;
            justify-content: space-between;
            align-items: flex-start
          }

          .restaurnat-detail-contents {
            word-break: break-all;
          }

          .restaurnat-detail-link {
            color: var(--grey-500);
          }

          .restaurant-deatil-button-container {
            margin-top: 16px
          }
        </style>
        <r-modal>
          <div class="restaurant-detail-container">
            <div class="detail-top-contents">
              <div class="restaurant__category">
                <img
                  src="assets/categories/${this.category}.png"
                  alt="${this.category}"
                  class="category-icon"
                >
              </div>
              <r-favorite-icon 
                ${this.isFavorite ? 'favorite' : ''} 
                restaurantName="${this.name}"></r-favorite-icon>
            </div>
            <h2 class="text-title">${this.name}</h2>
            <p class="restaurant__distance text-body">캠퍼스부터 ${this.distanceByMinutes}분 내</p>
            ${
              this.description &&
              `<p class="text-body restaurnat-detail-contents">${this.description}</p>`
            }
            ${
              this.referenceUrl &&
              `<a class="restaurnat-detail-contents restaurnat-detail-link" href=${this.referenceUrl} target="_blank">${this.referenceUrl}</a>`
            }
            <div class="restaurant-deatil-button-container button-container">
              <r-button type="button" action="deleteRestaurant" variant="secondary" name="삭제하기"></r-button>
              <r-button type="button" action="closeModal" variant="primary" name="닫기"></r-button>
            </div>
          </div>
        </r-modal>
    `;
  };

  render = () => {
    super.render();

    this.initEventHandlers();
  };

  clickDeleteButton = () => {
    this.dispatchEvent(
      new CustomEvent('deleteRestaurant', {
        bubbles: true,
        detail: {
          name: this.name,
        },
      }),
    );
  };

  initEventHandlers = () => {
    const $deleteButton = this.querySelector('button[action="deleteRestaurant"]');

    if (!$deleteButton) return;

    $deleteButton.addEventListener('click', this.clickDeleteButton);
  };
}

customElements.define('r-restaurant-detail-modal', RestaurantDetailModal);

export default RestaurantDetailModal;
