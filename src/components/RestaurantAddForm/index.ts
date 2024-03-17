import BaseComponent from "../BaseComponent";
import { MENU_APP_EVENTS } from "../../constants/event";
import { CATEGORIES, DISTANCES } from "../../constants/menu";
import { RestaurantAddItem } from "../../types/menu";
import { add } from "../../domains/Restaurants";
import { $ } from "../../utils/dom";

class RestaurantAddForm extends BaseComponent {
  private addFormElement: HTMLFormElement | null = null;

  constructor() {
    super();
  }

  render() {
    this.innerHTML = /*html*/ `
      <div class="modal-container">
        <h2 class="modal-title text-title">새로운 음식점</h2>
        <form id="restaurant-add-form">  
          <restaurant-option 
            id="category" 
            label="카테고리"
            options="${["선택해주세요", ...Object.values(CATEGORIES)]}"
            values="${["", ...Object.values(CATEGORIES)]}" 
            ></restaurant-option>
          <restaurant-name-input></restaurant-name-input>
          <restaurant-option 
            id="distance" 
            label="거리(도보 이동 시간)"
            values="${["", ...DISTANCES.map((v) => String(v))]}" 
            options="${[
              "선택해주세요",
              ...DISTANCES.map((v) => `${v}분 내`),
            ]}"></restaurant-option>
      
          <div class="form-item">
            <label for="description">설명</label>
            <textarea name="description" id="description" cols="30" rows="5" maxlength="300"></textarea>
            <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
            <p class="hidden" id="error-message">10글자 이하로 작성해주세요</p>
          </div>
          <div class="form-item">
            <label for="link">참고 링크</label>
            <input type="text" name="link" id="link">
            <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
          </div>
          <div class="button-container">
            <button type="reset" id="reset-button" class="button button--secondary text-caption">취소하기</button>
            <button type="submit" class="button button--primary text-caption">추가하기</button>
          </div>
        </form>
      </div> 
    `;

    this.addFormElement = $<HTMLFormElement>("#restaurant-add-form");
  }

  private isRestaurantItemType(
    addingItem: object | undefined
  ): addingItem is RestaurantAddItem {
    if (!addingItem) return false;
    return Object.keys(addingItem).every((key) =>
      ["name", "category", "distance", "description", "link"].includes(key)
    );
  }

  private resetFormData() {
    const restaurantFormElement = $<HTMLFormElement>("#restaurant-add-form");
    restaurantFormElement && restaurantFormElement.reset();
  }

  private getAddingItem() {
    if (!this.addFormElement) return;
    const formData = new FormData(this.addFormElement);

    const addItem = [...formData.entries()].reduce((accItems, currItem) => {
      const [key, value] = currItem;
      return {
        ...accItems,
        [key]: value,
      };
    }, {});

    return addItem;
  }

  private handleAddFormSubmit(addingItem: RestaurantAddItem) {
    try {
      if (add(addingItem)) {
        this.emitEvent(MENU_APP_EVENTS.renderRestaurants);
        this.emitEvent(MENU_APP_EVENTS.closeModal);
        this.resetFormData();
      }
    } catch (error) {
      error instanceof Error && alert(error);
    }
  }

  setEvent() {
    $("#restaurant-add-form")!.addEventListener("submit", (e) => {
      e.preventDefault();
      this.emitEvent(MENU_APP_EVENTS.restaurantFormSubmit);

      const addItem = this.getAddingItem();
      this.isRestaurantItemType(addItem) && this.handleAddFormSubmit(addItem);
    });

    $("#reset-button")!.addEventListener("click", () => {
      this.emitEvent(MENU_APP_EVENTS.closeModal);
    });
  }
}

customElements.define("restaurant-add-form", RestaurantAddForm);
