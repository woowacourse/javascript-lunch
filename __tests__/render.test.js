/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";

import RestaurantOptionSelect from "../src/components/RestaurantOptionSelect";

customElements.define("restaurant-option-select", RestaurantOptionSelect, {
  extends: "select",
});

beforeEach(() => {
  document.body.innerHTML = "";
});

test.each([
  [
    "category-filter",
    ["전체", "한식", "중식", "일식", "양식", "아시안", "기타"],
  ],
  ["sorting-filter", ["이름순", "거리순"]],
  [
    "category",
    ["선택해 주세요", "한식", "중식", "일식", "양식", "아시안", "기타"],
  ],
  [
    "distance",
    ["선택해 주세요", "5분 내", "10분 내", "15분 내", "20분 내", "30분 내"],
  ],
])(
  "restaurant-option-select 생성시 id에 따라 적절한 옵션값이 추가된다.",
  (id, optionTexts) => {
    const restaurantOptionSelect = `<select is="restaurant-option-select" id=${id}></select>`;

    document.body.insertAdjacentHTML("beforeend", restaurantOptionSelect);

    optionTexts.forEach((text) => {
      expect(screen.getByText(text)).toBeInTheDocument();
    });
  }
);
