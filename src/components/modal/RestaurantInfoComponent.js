import CustomElement from "../../abstracts/CustomElement";
import RestaurantInstance from "../../domain/store/RestaurantsStore";
import dispatcher from "../../domain/Dispatcher";
import {
  CATEGORY_IMG,
  FAVORITE_IMG,
  FAVORITE_TYPE,
  MODAL_ACTION,
  RESTAURANT_ACTION,
} from "../../abstracts/constants";

class RestaurantInfoComponent extends CustomElement {
  connectedCallback() {
    super.connectedCallback();
    RestaurantInstance.subscribe(this);
    RestaurantInstance.publish();
  }

  constructor() {
    super();
    this.state = {
      restaurant: {
        category: "",
        name: "",
        distance: 0,
        description: "",
        link: "",
        isFavorite: false,
      },
      isFavorite: "EMPTY",
    };
  }

  handleEvent() {
    this.shadowRoot
      .querySelector(".button--primary")
      .addEventListener("click", () => dispatcher(MODAL_ACTION.MODAL_OFF));

    this.shadowRoot
      .querySelector(".button--secondary")
      .addEventListener("click", () => {
        dispatcher(MODAL_ACTION.MODAL_OFF);
        dispatcher(
          RESTAURANT_ACTION.DELETE_RESTAURANT,
          this.getAttribute("id")
        );
      });

    const favoriteIcon = this.shadowRoot.querySelector(".favorite-icon");
    if (favoriteIcon) {
      favoriteIcon.addEventListener("click", () => {
        dispatcher(RESTAURANT_ACTION.HANDLE_FAVORITE, this.getAttribute("id"));
        RestaurantInstance.publish();
      });
    }
  }

  rerender({ restaurantList }) {
    const restaurant = restaurantList.find(
      (restaurant) => restaurant.id === Number(this.getAttribute("id"))
    );
    if (restaurant) {
      const isFavorite =
        restaurant.isFavorite === false
          ? FAVORITE_TYPE.NOT_FAVORITE
          : FAVORITE_TYPE.FAVORITE;

      this.state.restaurant = restaurant;
      this.state.isFavorite = isFavorite;

      this.shadowRoot
        .querySelector(".category-icon")
        .setAttribute("src", CATEGORY_IMG[this.state.restaurant.category]);

      this.shadowRoot
        .querySelector(".favorite-icon")
        .setAttribute("src", FAVORITE_IMG[this.state.isFavorite]);

      this.shadowRoot.querySelector("#title").innerHTML =
        this.state.restaurant.name;

      this.shadowRoot.querySelector("#distance").innerHTML =
        "캠퍼스로부터 " + this.state.restaurant.distance + "분 내";

      this.shadowRoot.querySelector("#description").innerHTML =
        this.state.restaurant.description;

      const $link = this.shadowRoot.querySelector("#link");
      $link.innerHTML = this.state.restaurant.link;
      $link.setAttribute("href", this.state.restaurant.link);
    }
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
                    overflow-y: scroll;
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
                    margin-top: 32px;
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
                    text-decoration-line: underline;
                    font-family: 'Inter';
                }

                #description {
                    color: var(--grey-500);
                    margin-bottom: 16px;
                }
            </style>
            <div class="info-modal">
                <div class="modal-info-head">
                    <div class="restaurant__category">
                        <img
                            src="${
                              CATEGORY_IMG[this.state.restaurant.category]
                            }"             
                            alt="category icon"
                            class="category-icon"
                        />
                    </div>
                    <div>
                        <img 
                            src="${FAVORITE_IMG[this.state.isFavorite]}" 
                            alt="favorite icon"
                            class="favorite-icon"
                        />
                    </div>
                </div>
                <h2 id="title" class="modal-title text-title">${
                  this.state.restaurant.name
                }</h2>
                <p id="distance" class="text-body">캠퍼스부터 ${
                  this.state.restaurant.distance
                }분 내</p>
                <p id="description" class="text-body">${
                  this.state.restaurant.description
                }</p>
                <a href="${
                  this.state.restaurant.link
                }" id="link" class="text-body">${this.state.restaurant.link}</a>
                <div class="button-container">
                    <button type="button" class="button button--secondary text-caption">삭제하기</button>
                    <button type="button" class="button button--primary text-caption">닫기</button>
                </div>
            </div>
        `;
  }
}

customElements.define("restaurant-info", RestaurantInfoComponent);
export default RestaurantInfoComponent;
