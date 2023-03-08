import { CATEGORY_IMG, FAVORITE_IMG } from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";
import dispatcher from "../../domain/Dispatcher";

class RestaurantComponent extends CustomElement {
  handleEvent() {
    const id = this.getAttribute("id");
    this.shadowRoot
      .querySelector(".favorite-icon")
      .addEventListener("click", () => dispatcher("handle_favorite", id));

    this.shadowRoot
      .querySelector(".restaurant__information")
      .addEventListener("click", () => {
        dispatcher("modal_restaurant_info", id);
      });
  }

  template() {
    const name = this.getAttribute("name");
    const category = this.getAttribute("category");
    const distance = this.getAttribute("distance");
    const description = this.getAttribute("description");
    const isFavorite =
      this.getAttribute("isFavorite") === "false" ? "EMPTY" : "FILLED";
    return `
    <style>
      * {
        padding: 0;
        margin: 0;
        box-sizing: border-box;
      } 

      li {
        list-style: none;
      }

      .text-subtitle {
        font-size: 18px;
        line-height: 28px;
        font-weight: 600;
      }
      
      .text-body {
        font-size: 16px;
        line-height: 24px;
        font-weight: 400;
      }

      .restaurant {
        display: flex;
        align-items: flex-start;
        justify-content: space-between;
        padding: 16px 8px;
        border-bottom: 1px solid #e9eaed;
      }
      
      .restaurant__category {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 64px;
        height: 64px;
        min-width: 64px;
        min-height: 64px;
      
        margin-right: 16px;
      
        border-radius: 50%;
        background: var(--lighten-color);
      }

      .category-icon {
        width: 36px;
        height: 36px;
      }
      
      .restaurant__info {
        display: flex;
        flex-direction: column;
        justify-content: flex-start;
      }
      
      .restaurant__name {
        margin: 0;
      }
      
      .restaurant__distance {
        color: var(--primary-color);
      }
      
      .restaurant__description {
        display: -webkit-box;
      
        padding-top: 8px;
      
        overflow: hidden;
        text-overflow: ellipsis;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }

      .restaurant__information {
        display: flex;
        align-items: flex-start;
      }
    </style>
    <li class="restaurant">
      <div class="restaurant__information">
        <div class="restaurant__category">
          <img
              src="${CATEGORY_IMG[category]}"             
              alt=${category}
              class="category-icon"
          />
        </div>
        <div class="restaurant__info">
            <h3 class="restaurant__name text-subtitle">${name}</h3>
            <span class="restaurant__distance text-body">캠퍼스부터 ${distance}분 이내</span>
            <p class="restaurant__description text-body">
              ${description}
            </p>
        </div>
      </div>
      <div>
        <img 
          src="${FAVORITE_IMG[isFavorite]}" 
          alt=${isFavorite} 
          class="favorite-icon"
        />
      </div>
    </li>
        `;
  }
}

customElements.define("restaurant-element", RestaurantComponent);

export default RestaurantComponent;
