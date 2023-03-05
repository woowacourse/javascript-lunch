import { RestaurantType } from "./Restaurant";
import RestaurantList from "./RestaurantList";

type category = "한식" | "중식" | "일식" | "양식" | "아시안" | "기타";
type distance = 5 | 10 | 15 | 20 | 30;

const AddButton = {
  // template() {
  //   return `<div class="button-container">
  //   <button type="button" class="button button--secondary text-caption">취소하기</button>
  //   <button class="button button--primary text-caption">추가하기</button>
  // </div>`;
  // },
  setEvent() {
    const cancelButton = document.querySelector(".button--secondary");
    cancelButton?.addEventListener("click", () => {
      const modal = document.querySelector(".modal--open") as HTMLElement;
      modal.className = "modal";
    });

    const restaurantListContainer = document.querySelector(
      ".restaurant-list-container"
    ) as HTMLElement;

    const addButton = document.querySelector(".button--primary");
    addButton?.addEventListener("click", (e) => {
      e.preventDefault();

      const newRestaurant: RestaurantType = this.getModalInfo();
      RestaurantList.addRestaurant(newRestaurant);
      restaurantListContainer.innerHTML = RestaurantList.template(
        RestaurantList.originList
      );

      const modal = document.querySelector(".modal--open") as HTMLElement;
      modal.className = "modal";
    });
  },

  getModalInfo() {
    const category = document.querySelector("#category") as HTMLSelectElement;
    const name = document.querySelector("#name") as HTMLInputElement;
    const distance = document.querySelector("#distance") as HTMLSelectElement;
    const description = document.querySelector(
      "#description"
    ) as HTMLInputElement;
    const link = document.querySelector("#link") as HTMLInputElement;

    const selectedCategory = category.options[category.selectedIndex].value;
    const inputName = name.value;
    const selectedDistance = distance.options[distance.selectedIndex].value;
    const inputDescription = description.value;
    const inputLink = link.value;

    category.innerText = "";
    name.value = "";
    distance.innerText = "";
    description.value = "";
    link.value = "";

    return {
      category: selectedCategory as category,
      name: inputName,
      distance: Number(selectedDistance) as distance,
      description: inputDescription,
      link: inputLink,
    };
    // return [selectedCategory, inputName, selectedDistance, inputDescription];
  },
};

export default AddButton;
