import Component from "../Component.js";
import addData from "../../domain/addData.js";
import createModalInputs from "./createModalInputs.js";
import {
  getStoredRestaurantData,
  setStoredRestaurantData,
} from "../../domain/storeRestaurantData.js";
import { filterRestaurants } from "../../domain/filterRestaurants.js";
class Modal extends Component {
  constructor($target, props) {
    super($target, props);
  }

  template() {
    console.log(this.props.mode);
    if (this.props.mode === "add") {
      return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='input-form'>

      <div id="category" class="form-item form-item--required"></div>

        <div id="name" class="form-item form-item--required">
        </div>

        <div id="distance" class="form-item form-item--required"></div>

        <div id="description" class="form-item"></div>

        <div id="link" class="form-item"></div>

        <div class="button-container">
          <button id="close_button" type="button" class="button button--secondary text-caption">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    </div>
    `;
    } else if (this.props.mode === "detail") {
      return `<div class="modal-backdrop"></div>
    <div class="modal-container">
      <div class="modal-wrapper">
        <div class="restaurant__category">
            <img src=${this.props.data.imgSrc} alt=${this.props.data.imgAlt} class="category-icon"/>
        </div>
        <img src="/unFilledStar.png" class="restaurant__like"/>
      </div>
      <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">${this.props.data.name}</h3>
          <span class="restaurant__distance text-body">캠퍼스부터 ${this.props.data.distance}분 내</span>
          <p class="restaurant__description text-body">${this.props.data.description}</p>
           <a href="${this.props.data.link}" class="restaurant__link text-body">${this.props.data.name} 홈페이지</a>
      </div>
        <div class="button-container">
          <button id="delete_button" type="button" class="button button--secondary text-caption">삭제하기</button>
          <button id="close_button" class="button button--primary text-caption">닫기</button>
        </div>
    </div>
    `;
    }
  }

  render() {
    this.$target.innerHTML = this.template();
    this.setEvent();
    if (this.props.mode === "add") {
      createModalInputs();
    }
  }

  setEvent() {
    const modalContainer = document.querySelector(".modal");
    this.$target
      .querySelector(".modal-backdrop")
      .addEventListener("click", () => {
        modalContainer.classList.toggle("modal--open");
      });
    this.$target
      .querySelector("#close_button")
      .addEventListener("click", () => {
        modalContainer.classList.toggle("modal--open");
      });
    if (this.props.mode === "detail") {
      this.$target
        .querySelector("#delete_button")
        .addEventListener("click", () => {
          console.log("클릭");
          this.deleteRestaurant(this.props.data.name);
          modalContainer.classList.toggle("modal--open");
        });
    }
    if (this.props.mode === "add") {
      this.submitForm();
    }
  }

  submitForm() {
    document
      .getElementById("input-form")
      .addEventListener("submit", (event) => {
        event.preventDefault();
        const modalContainer = document.querySelector(".modal");
        modalContainer.classList.toggle("modal--open");
        const newData = addData();
        document.dispatchEvent(
          new CustomEvent("restaurantUpdated", { detail: newData }),
        );
      });
  }

  deleteRestaurant(name) {
    let updatedData = getStoredRestaurantData().filter(
      (restaurant) => restaurant.name !== name,
    );
    setStoredRestaurantData(updatedData);
    const currentCategory = localStorage.getItem("selectedCategory") || "전체";
    const currentSort = localStorage.getItem("sortType") || "name";
    filterRestaurants(currentCategory, currentSort);
  }
}

export default Modal;
