import { $ } from "../../util/querySelector";
import InputSuccessModal from "../InputSuccessModal";

const addChangeToAllEvent = (modal: InputSuccessModal) => {
  (modal.element.querySelector(".button--primary") as HTMLButtonElement)
    .addEventListener("click", () => {
      ($("#category-filter") as HTMLSelectElement).value = "전체";
      ($("#global-filter-radio #all-restaurant") as HTMLInputElement).checked = true;

      modal.element.dispatchEvent(new CustomEvent("updateList", { bubbles: true }));
      modal.close();
    });
};

export default addChangeToAllEvent;
