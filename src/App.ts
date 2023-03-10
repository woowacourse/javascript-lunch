import Header from "./components/Header";
import RestaurantFormBottomSheet from "./components/RestaurantFormBottomSheet";
import RestaurantList from "./components/RestaurantList";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./types/type";
import NavigatorContainer from "./components/NavigatorContainer";
import Page from "./components/pages/Page";

class App {
  restaurantList: Restaurant[];
  target: HTMLElement;
  // currentPage: Page;

  constructor(body: Element) {
    this.target = <HTMLElement>body;
    this.restaurantList = restaurantListHandler.getRestaurants();
    // this.currentPage = "total";

    Header.initialize(this.target);
    RestaurantFormBottomSheet.initialize(
      this.target,
      this.addRestaurantItemToList.bind(this)
    );
    NavigatorContainer.initialize(this.target, this.navigateToPage);

    RestaurantList.updateRestaurantList(this.restaurantList);
  }

  addRestaurantItemToList(data: Restaurant) {
    restaurantListHandler.addRestaurant(data);
    this.restaurantList = restaurantListHandler.getRestaurants();

    RestaurantList.updateRestaurantList(this.restaurantList);
  }

  navigateToPage = (pageName: string) => {
    if (pageName === "total") {
      new Page(this.target, this.restaurantList, pageName);
      return;
    }
    new Page(
      this.target,
      restaurantListHandler.getBookmarkRestaurants(),
      pageName
    );
  };
}

export default App;
