import { $, ControlDom } from "../../until/ControlDom";
import { RestaurantData } from "../../domain/RestaurantData";
import { CategoryType, TakeTimeType } from "../../Template";
import { RenderRestaurantList } from "../../domain/RenderRestaurantList";

const InputForm = {
  template() {
    return `
    <div class="bottomSheet">
      <div class="bottomSheet-backdrop"></div>
        <div class="bottomSheet-container">
          <h2 class="BottomSheet-title text-title">새로운 음식점</h2>
          <form>
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
              <select name="category" id="category" required>
                <option value="">선택해 주세요</option>
                <option value="한식">한식</option>
                <option value="중식">중식</option>
                <option value="일식">일식</option>
                <option value="양식">양식</option>
                <option value="아시안">아시안</option>
                <option value="기타">기타</option>
              </select>
          </div>
          <div class="form-item form-item--required">
            <label for="name text-caption">이름</label>
            <input type="text" name="name" id="name" required>
          </div>
          <div class="form-item form-item--required">
            <label for="takeTime text-caption">거리(도보 이동 시간) </label>
              <select name="takeTime" id="takeTime" required>
                <option value="">선택해 주세요</option>
                <option value="5">5분 내</option>
                <option value="10">10분 내</option>
                <option value="15">15분 내</option>
                <option value="20">20분 내</option>
                <option value="30">30분 내</option>
              </select>
            </div>
            <div class="form-item">
              <label for="description text-caption">설명</label>
              <textarea name="description" id="description" cols="30" rows="5"></textarea>
              <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
            </div>
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="url" name="link" id="link">
              <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
            </div>
            <div class="button-container">
              <button type="reset" class="button button--secondary text-caption">취소하기</button>
              <button type="submit" class="button button--primary text-caption">추가하기</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  `;
  },

  setEventSubmit() {
    const formElem = $("form");
    formElem?.addEventListener("submit", (event) => {
      event.preventDefault();

      const bottomSheet = $(".bottomSheet") as HTMLElement;
      this.addRestaurant(bottomSheet);
    });
  },

  addRestaurant(elem: HTMLElement) {
    const newRestaurant = this.getInfo();
    RestaurantData.addRestaurant(newRestaurant);
    RenderRestaurantList.render();

    ControlDom.showClose(elem, "bottomSheet--open");
    this.reset();
  },

  setEventCloseInput() {
    const buttonSecondary = $(".button--secondary");
    buttonSecondary?.addEventListener("click", () => {
      const bottomSheet = $(".bottomSheet") as HTMLElement;
      ControlDom.showClose(bottomSheet, "bottomSheet--open");
    });
  },

  getInfo() {
    RestaurantData.id++;
    const form = new FormData($("form") as HTMLFormElement);
    const [category, name, takeTime, description, link]: string[] = Array.from(
      form.values()
    ).map(String);

    return {
      id: RestaurantData.id,
      category: category as CategoryType,
      name: name,
      takeTime: Number(takeTime) as TakeTimeType,
      like: false,
      description: description,
      link: link,
    };
  },

  reset() {
    const form = $("form") as HTMLFormElement;
    form.reset();
  },
};
export default InputForm;
