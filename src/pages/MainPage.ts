import { Dropdown } from "../component/dropdown/Dropdown.ts";
import { DropdownContainer } from "../component/dropdown/DropdownContainer.ts";
import FoodForm from "../component/food-form/FoodForm.ts";
import FoodList from "../component/food-list/FoodList.ts";
import { Header } from "../component/layout/header/Header.js";
import Modal from "../component/layout/modal/Modal.js";
import TabMenu from "../component/tab-menu/TabMenu.ts";
import { DROPDOWN_OPTIONS } from "../constants/constants.ts";
import { getStoredFoodItems } from "../managers/storageManagers.js";

export default class MainPage {
  container: HTMLDivElement;
  foodList: FoodList;
  modal: Modal;
  foodForm: FoodForm;
  tabMenu: TabMenu;
  dropdownContainer: DropdownContainer;

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

    const dropdowns = [
      new Dropdown({ name: "category", options: DROPDOWN_OPTIONS.category, type: "filter" }),
      new Dropdown({ name: "sort", options: DROPDOWN_OPTIONS.sort, type: "sort" }),
    ];
    this.dropdownContainer = new DropdownContainer({ dropdowns: dropdowns });

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
    this.foodList.resetFavoriteFilter();
    return this.foodList.element;
  }

  render() {
    this.container.innerHTML = "";

    if (this.dropdownContainer.element) {
      this.container.appendChild(this.dropdownContainer.element);
    }
    this.container.appendChild(this.getFoodListElement());
  }

  handleSubmit(formData: FoodItemType) {
    this.foodList.addItem(formData);
    this.modal.close();
  }
}
