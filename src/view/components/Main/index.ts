import RestaurantList from "../../../domain/RestaurantList";
import RestaurantListSection from "./RestaurantListSection";
import RestaurantFilterSection from "./RestaurantFilterSection";
import RestaurantTabSection from "./RestaurantTabSection";
import BaseComponent from "../../../util/BaseComponent";
import { Category, SortingStandard } from "../../../types";
import RestaurantDetailModal from "./RestaurantDetailModal";

interface Props {
  restaurantList: RestaurantList;
}

interface State {
  currentTab: "all" | "favorite";
  currentCategory: Category | "전체";
  currentSortingStandard: SortingStandard;
}

class Main extends BaseComponent<Props, State> {
  protected state: State;

  constructor(props: Props) {
    const $main = document.createElement("main");
    super($main, props);
    this.state = {
      currentTab: "all",
      currentCategory: "전체",
      currentSortingStandard: "name",
    };
  }

  protected setEvent(): void {}

  protected compose(): void {
    this.$root.replaceChildren(
      new RestaurantTabSection({
        currentTab: this.state.currentTab,
        onFavoriteTabClick: () =>
          this.setState({ ...this.state, currentTab: "favorite" }),
        onAllTabClick: () =>
          this.setState({ ...this.state, currentTab: "all" }),
      }).render(),
      this.state.currentTab === "all"
        ? new RestaurantFilterSection({
            currentCategory: this.state.currentCategory,
            currentSortingStandard: this.state.currentSortingStandard,
            onCategoryChange: (category) =>
              this.setState({ ...this.state, currentCategory: category }),
            onSortingStandardChange: (sortingStandard) =>
              this.setState({
                ...this.state,
                currentSortingStandard: sortingStandard,
              }),
          }).render()
        : "",
      new RestaurantListSection({
        restaurants: this.props.restaurantList.getRestaurants({
          category: this.state.currentCategory,
          sortingStandard: this.state.currentSortingStandard,
          isGoToFilter: this.state.currentTab === "favorite",
        }),
        onItemClick: this.onRestaurantItemClick.bind(this),
        onFavoriteIconClick: this.onFavoriteIconClick.bind(this),
      }).render()
    );
  }

  private onFavoriteIconClick(id: number) {
    this.props.restaurantList.toggleIsGoTo(id);
    this.render();
  }

  private onRestaurantItemClick(id: number) {
    const restaurant = this.props.restaurantList.getRestaurant(id);
    const detailModal = new RestaurantDetailModal({
      restaurant,
      onRemoveButtonClick: (id: number) => {
        this.props.restaurantList.removeRestaurant(id);
        this.render();
      },
      onFavoriteIconClick: (id: number) => {
        this.props.restaurantList.toggleIsGoTo(id);
      },
      onCancelButtonClick: () => {
        this.render();
      },
    });
    this.$root.appendChild(detailModal.render());
  }
}

export default Main;
