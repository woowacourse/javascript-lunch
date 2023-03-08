import { CATEGORY_IMG, FAVORITE_IMG } from "../../abstracts/constants";
import CustomElement from "../../abstracts/CustomElement";
import RestaurantInstance from "../../domain/RestaurantsStore";
import dispatcher from "../../domain/Dispatcher";

class RestaurantInfoComponent extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    RestaurantInstance.subscribe(this);
    RestaurantInstance.publish();
  }

  handleEvent() {
    if (this.shadowRoot.querySelector(".button--primary")) {
      this.shadowRoot
        .querySelector(".button--primary")
        .addEventListener("click", () => {
          dispatcher("modal_off");
        });
    }
  }

  rerender(restaurantList) {
    const restaurant = restaurantList.find(
      (restaurant) => restaurant.id === Number(this.getAttribute("id"))
    );
    const isFavorite = restaurant.isFavorite === false ? "EMPTY" : "FILLED";

    const modalInner = `
        <div class="modal-info-head">
            <div class="restaurant__category">
                <img
                    src="${CATEGORY_IMG[restaurant.category]}"             
                    alt=${restaurant.category}
                    class="category-icon"
                />
            </div>
            <div>
                <img 
                    src="${FAVORITE_IMG[isFavorite]}" 
                    alt=${isFavorite} 
                    class="favorite-icon"
                />
            </div>
        </div>
        <h2 id="title" class="modal-title text-title">${restaurant.name}</h2>
        <p id="distance" class="text-body">캠퍼스부터 ${
          restaurant.distance
        }분 내</p>
        <p id="description" class="text-body">${restaurant.description}</p>
        <a id="link" class="text-body">${restaurant.link}</a>
    `;

    this.shadowRoot
      .querySelector(".info-modal")
      .insertAdjacentHTML("afterbegin", modalInner);
  }

  template() {
    return `
            <style>
                * {
                    padding: 0;
                    margin: 0;
                    box-sizing: border-box;
                }

                :host {
                    display: block;
                    max-height: 50vh;
                    width: 100%;
                    overflow: scroll;
                    padding: 32px 16px !important;
                }

                .modal-info-head {
                    display: flex;
                    align-items: center;
                    justify-content: space-between;
                }

                .restaurant__category {
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    width: 64px;
                    height: 64px;
                    min-width: 64px;
                    min-height: 64px;
                    border-radius: 50%;
                    background: var(--lighten-color);
                    margin-bottom: 16px;
                }

                .button-container {
                    display: flex;
                  }
                  
                .button {
                    width: 100%;
                    height: 44px;
                  
                    margin-right: 16px;
                  
                    border: none;
                    border-radius: 8px;
                  
                    font-weight: 600;
                    cursor: pointer;
                }
                  
                .button:last-child {
                    margin-right: 0;
                }
        
                .button--secondary {
                    border: 1px solid var(--grey-300);
                    background: transparent;
                  
                    color: var(--grey-300);
                }
                  
                .button--primary {
                    background: var(--primary-color);
                  
                    color: var(--grey-100);
                } 

                .modal-title {
                    margin-bottom: 16px;
                }

                .text-title {
                    font-size: 20px;
                    line-height: 24px;
                    font-weight: 600;
                }

                .text-body {
                    font-size: 16px;
                    line-height: 24px;
                    font-weight: 400;
                }

                #distance {
                    color: var(--primary-color);
                    margin-bottom: 16px;
                }

                #link {
                    color: var(--grey-500);
                    margin-bottom: 32px;
                }

                #description {
                    color: var(--grey-500);
                    margin-bottom: 16px;
                }
            </style>
            <div class="info-modal">
                <div class="button-container">
                    <button type="button" class="button button--secondary text-caption">삭제하기</button>
                    <button type="submit" class="button button--primary text-caption">닫기</button>
                </div>
            </div>
        `;
  }
}

customElements.define("restaurant-info", RestaurantInfoComponent);
export default RestaurantInfoComponent;
