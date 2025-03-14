import FoodForm from "../component/FoodForm.js";
import FoodList from "../component/FoodList.js";
import { Header } from "../component/layout/Header.js";
import Modal from "../component/layout/modal/Modal.js";
import TabMenu from "../component/TabMenu.js";
import { getStoredFoodItems } from "../managers/storageManagers.js";

export default class MainPage {
  container: HTMLDivElement;
  foodList: FoodList;
  modal: Modal;
  foodForm: FoodForm;
  tabMenu: TabMenu;

  constructor() {
    this.foodList = new FoodList({ foodItems: getStoredFoodItems() });

    this.foodForm = new FoodForm({
      onModalClose: () => this.modal.close(),
      onSubmit: this.handleSubmit.bind(this),
    });

    this.modal = new Modal({
      content: this.foodForm.element,
    });

    this.tabMenu = new TabMenu();
    this.tabMenu.onTabChange = () => {
      this.render();
    };

    this.container = document.createElement("div");

    const body = document.querySelector("body")!;

    body.appendChild(this.modal.element);
    body.appendChild(Header({ title: "점심 뭐 먹지?", onAddClick: () => this.modal.open() }));
    body.appendChild(this.tabMenu.element);
    body.appendChild(this.container);

    this.render();
  }

  getFoodListElement() {
    if (this.tabMenu.currentMenu === "favorite") {
      this.foodList.filterFavoriteItem();
      return this.foodList.element;
    }
    this.foodList.resetFilter();
    return this.foodList.element;
  }

  render() {
    this.container.innerHTML = "";

    this.container.appendChild(this.getFoodListElement());
  }

  handleSubmit(formData: FoodItemProps) {
    this.foodList.addItem(formData);
    this.modal.close();
  }
}
