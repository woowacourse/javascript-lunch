import FilterContainer from "./FilterContainer";
import ListContainer from "./listContainer/ListContainer";
import DOM from "../utils/DOM";
import Restaurant from "./restaurant/Restaurant";

const { $ } = DOM;

interface TabPaneProps {
  filterContainer?: FilterContainer;
  listContainer: ListContainer;
}

class TabPane extends HTMLElement {
  private filterContainer: FilterContainer | null;
  private listContainer: ListContainer | null;

  constructor() {
    super();
    this.className = 'tabpane';
    this.filterContainer = null;
    this.listContainer = null;
  }

  private removeTabPane() {
    this.replaceChildren();
    this.filterContainer = null;
    this.listContainer = null;
  }

  private removeListContainer() {
    this.removeChild($<ListContainer>('#restaurant-lists'));
    this.listContainer = null;
  }

  showContent(tabPaneProps: TabPaneProps) {
    this.removeTabPane();
    
    const { filterContainer, listContainer } = tabPaneProps;
    if (filterContainer !== undefined) {
      this.appendChild(filterContainer);
      this.filterContainer = filterContainer;
    }

    this.appendChild(listContainer);
    this.listContainer = listContainer;
  }

  showListChange(listContainer: ListContainer) {
    this.removeListContainer();
    this.appendChild(listContainer);
    this.listContainer = listContainer;
  }

  showListAppend(restaurant: Restaurant) {
    this.listContainer?.addRestaurants(restaurant);
  }

  showListDelete(targetId: string) {
    this.listContainer?.deleteRestaurant(targetId);
  }

}

customElements.define('matzip-tabpane', TabPane, {extends: 'section'});

export default TabPane;
