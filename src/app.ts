import Matzip from "./matzip";
import storage from './storage';
import LOCAL_STORAGE_KEY from './constants/LocalStorageKey';

const { MATZIP_DATA } = LOCAL_STORAGE_KEY;
import { CategoryType, SortType, Restaurant as RestaurantType } from './types';
import DOM from './utils/DOM';

import FilterContainer, { FilterChangeEvent } from "./components/FilterContainer";
import TabPane from "./components/TabPane";
import Header from "./components/header/Header";
import Tab from "./components/tab/Tab";
import Restaurant from './components/restaurant/Restaurant';
import ListContainer from './components/listContainer/ListContainer';
import RestaurantForm from './components/RestaurantForm';
import Modal from './components/modal/Modal';
import { RestaurantDeleteEvent } from './components/restaurantDetail/RestaurantDetail';

const { $ } = DOM;

class App extends HTMLElement {
  private matzip: Matzip;
  private main: HTMLElement;
  private tab: Tab;
  private tabPane: TabPane;
  private appendModal: Modal;

  constructor() {
    super();
    this.matzip = new Matzip(storage.getData(MATZIP_DATA));

    this.createHeader();
    this.main = this.createMain();
    this.tab = this.createTab();
    this.tabPane = this.createTabpane();
    this.appendModal = this.createAppendModal();
    this.setEvent();
  }

  setEvent() {
    this.listenModalToggle();
    this.setEventWholeMode();
    this.listenRestaurantAdd();
    this.listenRestaurantDelete();
  }

  setEventWholeMode() {
    this.createWholeRestaurant();
    this.changeFilter();
  }
  
  createHeader() {
    const header = new Header();
    this.prepend(header);
  }

  createMain() {
    const main = document.createElement('main');
    this.appendChild(main);
    return main;
  }

  createTab() {
    const tab = new Tab(['모든 음식점', '자주 가는 음식점']);
    this.main.prepend(tab);
    return tab;
  }

  createTabpane() {
    const tabPane = new TabPane();
    this.main.appendChild(tabPane);
    return tabPane;
  }

  createWholeRestaurant() {
    const filterContainer = new FilterContainer();
    const { category, sort } = filterContainer.getFilterValues();
    const restaurantElements: Restaurant[] = this.matzip.filterAndSort(category as CategoryType, sort as SortType).map((restaurant) => new Restaurant(restaurant));
    const listContainer = new ListContainer(restaurantElements);
    
    this.tabPane.showContent({filterContainer, listContainer});
  }

  createAppendModal() {
    const modal = new Modal({ classname: 'modal', title: '새로운 음식점', child: new RestaurantForm() });
    this.main.appendChild(modal);
    return modal;
  }

  listenModalToggle() {    
    this.appendModal.backdropClick(this.appendModal, 'modal');

    $<HTMLButtonElement>('.modal--close').addEventListener('click', () => {
      this.appendModal.toggleModal('modal');
    });
  }

  changeFilter() {
    document.addEventListener('filterChange', (event: Event) => {
      const customEvent = event as FilterChangeEvent;
      const selectedCategory = customEvent.detail.selectedCategory;
      const selectedSort = customEvent.detail.selectedSort;
      const restaurantElements: Restaurant[] = this.matzip.filterAndSort(
        selectedCategory as CategoryType,
        selectedSort as SortType,
      ).map((restaurant) => new Restaurant(restaurant));

      const listContainer = new ListContainer(restaurantElements);   
      this.tabPane.showListChange(listContainer);   
    });
  }
  
  listenRestaurantAdd() {
    const form = $<RestaurantForm>('#restaurant-form'); 

    form.addEventListener('submit', (event) => {
      event.preventDefault();
      const formFields = form.getFormFields();      
      const fieldValues = formFields.map((field) => field.getValue());

      const newRestaurant: RestaurantType = {
        id: crypto.randomUUID().replace(/-/g, ''),
        category: fieldValues[0] as CategoryType,
        name: fieldValues[1],
        distance: Number(fieldValues[2]),
        introduction: fieldValues[3],
        link: fieldValues[4],
      };

      try {
        this.matzip.add(newRestaurant);        
        storage.addData(MATZIP_DATA, newRestaurant);
        this.appendModal.toggleModal('modal');
        this.tabPane.showListAppend(new Restaurant(newRestaurant));
        form.reset();
      } catch (error) {
        alert(error);
      }
    });
  }

  listenRestaurantDelete() {
    document.addEventListener('deleteRestaurant', (event: Event) => {            
      const restaurantDeleteEvent = event as RestaurantDeleteEvent;      
      const targetId = restaurantDeleteEvent.detail.targetId;
      
      this.matzip.delete(targetId);
      storage.modifyData<RestaurantType>(MATZIP_DATA, this.matzip.getRestaurants());
      this.tabPane.showListDelete(targetId);
    });
  }
}

customElements.define('matzip-app', App);
