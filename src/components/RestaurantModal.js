import createElement from "../util/createElement.js";
import RestaurantSelect from "./RestaurantSelect.js";

export default function RestaurantModal() {
  const $template = document.createElement("template");

  $template.innerHTML = `
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form>
            <div class="form-item form-item--required">
              <label for="category text-caption">카테고리</label>
                
            </div>
          </form>`;

  return $template.content;
}
