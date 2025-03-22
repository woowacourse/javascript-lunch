import { Dropdown } from "../component/dropdown/Dropdown.ts";
import { DropdownContainer } from "../component/dropdown/DropdownContainer.ts";
import FoodForm from "../component/food-form/FoodForm.ts";
import FoodList from "../component/food-list/FoodList.ts";
import { Header } from "../component/layout/header/Header.js";
import Modal from "../component/common/modal/Modal.js";
import TabMenu from "../component/tab-menu/TabMenu.ts";
import { DROPDOWN_OPTIONS } from "../constants/constants.ts";
import { getStoredFoodItems } from "../managers/storageManagers.js";
import { FoodItemType } from "../types/food.ts";

export default class MainPage {
  container: HTMLDivElement;
  foodList: FoodList;
  modal: Modal;
  foodForm: FoodForm;
  tabMenu: TabMenu;

  filterDropdown: Dropdown;
  sortDropdown: Dropdown;
  dropdownContainer: DropdownContainer;

  constructor() {
    this.foodList = new FoodList({ foodItems: getStoredFoodItems() });

    this.foodForm = new FoodForm({
      onCancel: () => this.modal.close(),
      onSubmit: (formItem) => this.handleSubmit(formItem),
    });

    this.modal = new Modal({
      content: this.foodForm.element,
    });

    this.tabMenu = new TabMenu({ onTabChange: (currentMenu: string) => this.foodList.updateFavoriteList(currentMenu) });

    this.filterDropdown = new Dropdown({ name: "category", options: DROPDOWN_OPTIONS.category, onChange: this.handleFilterChange.bind(this) });
    this.sortDropdown = new Dropdown({ name: "sort", options: DROPDOWN_OPTIONS.sort, onChange: this.handleSortChange.bind(this) });
    this.dropdownContainer = new DropdownContainer({ dropdowns: [this.filterDropdown, this.sortDropdown] });

    this.container = document.createElement("div");

    this.render();
  }

  handleFilterChange() {
    this.foodList.updateFilterItem(this.filterDropdown.selectValue);
  }

  handleSortChange() {
    this.foodList.updateSortItem(this.sortDropdown.selectValue);
  }

  handleSubmit(foodItem: FoodItemType) {
    this.foodList.updateAddItem(foodItem);
    this.modal.close();
  }

  render() {
    this.container.innerHTML = "";
    const body = document.querySelector("body")!;

    body.appendChild(this.modal.element);
    body.appendChild(Header({ title: "점심 뭐 먹지?", onAddClick: () => this.modal.open() }));
    body.appendChild(this.tabMenu.element);
    body.appendChild(this.container);

    this.renderDynamicSection();
  }

  renderDynamicSection() {
    this.container.appendChild(this.dropdownContainer.element);
    this.container.appendChild(this.foodList.element);
  }
}
