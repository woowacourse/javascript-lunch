import { restaurants } from "../../domain/restaurants";

export const onChangeMenuTabs = () => {
  changeTabColor();
  const form = document.getElementById("menuTabForm");
  form?.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) {
      changeTabColor();
      const newMenu = event.target.value;
      restaurants.state.menuTab = newMenu;
    }
  });
};

const changeTabColor = () => {
  const elements = document.querySelectorAll('[name="tab-menu"]') as NodeListOf<HTMLInputElement>;
  elements.forEach((e: HTMLInputElement) => {
    if (e.checked) {
      e.parentElement?.classList.add("tab-menu-open");
    }
    else {
      e.parentElement?.classList.remove("tab-menu-open");
    }
  })
}