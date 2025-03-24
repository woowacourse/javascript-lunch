import { createElement } from "../../utils/utils.ts";

export function CategoryIcon(category) {
  function template() {
    return `
        <div class="restaurant__category">
            <img src="./images/category-${category}.png" alt="${category}" class="category-icon">
        </div>
        `;
  }
  return template();
}
