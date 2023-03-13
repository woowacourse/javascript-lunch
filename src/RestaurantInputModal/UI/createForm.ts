import SelectInput from "../../util/SelectInput";
import { getFoodCategoryMemberList } from "../../type/FoodCategory";
import { getEstimatedTimeMemberList } from "../../type/EstimatedTime";
import TEMPLATE from "./template";

const attachSelectInput = (element: HTMLElement) => {
  const categoryPosition = element.querySelector(".category-input");
  const distancePosition = element.querySelector(".distance-input");

  if (!categoryPosition || !distancePosition) {
    throw new Error("[ERROR] Selector input을 놓을 공간이 템플릿에 없습니다.");
  }
  
  categoryPosition.appendChild(
    SelectInput.create(
      "category",
      "카테고리",
      ["", ...getFoodCategoryMemberList()],
      ["선택해 주세요", ...getFoodCategoryMemberList()],
  ));

  distancePosition.appendChild(
    SelectInput.create(
    "distance",
    "거리(걸리는 시간)",
    ["", ...getEstimatedTimeMemberList()],
    ["선택해 주세요", ...getEstimatedTimeMemberList()],
  ));
};

const createElement = (): HTMLElement => {
  const form = document.createElement("div");

  form.innerHTML = TEMPLATE;
  attachSelectInput(form);

  return form;
};

export default createElement;
