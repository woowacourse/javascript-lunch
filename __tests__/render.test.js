/**
 * @jest-environment jsdom
 */
import { screen } from "@testing-library/dom";
import "@testing-library/jest-dom";
import createCustomSelect from "../src/components/CustomSelect";
import createModal from "../src/components/CustomModal";

createCustomSelect();
createModal();

test.each([
  ["distance", "15분 내"],
  ["category", "한식"],
  ["category-filter", "한식"],
  ["sorting-filter", "이름순"],
])(
  "CustomSelect 생성시 id에 따라 적절한 옵션값이 추가된다.",
  (id, optionText) => {
    document.body.innerHTML = `
      <select is="custom-select" id=${id}></select>
    `;

    expect(screen.getByText(optionText));
  }
);
