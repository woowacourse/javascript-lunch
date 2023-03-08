import { restaurants } from "../../domain/restaurants";

export const onChangeMenuTabs = () => {
  const form = document.getElementById("menuTabForm");
  form?.addEventListener("change", (event) => {
    if (event.target instanceof HTMLInputElement) {
      const newMenu = event.target.value;
      restaurants.state.menuTab = newMenu;
    }
  });
};
