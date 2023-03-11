import Header from "./components/Header";
import RestaurantFormBottomSheet from "./components/RestaurantFormBottomSheet";
import RestaurantList from "./components/RestaurantList";
import restaurantListHandler from "./domain/restaurantListHandler";
import { Restaurant } from "./types/type";
import NavigatorContainer from "./components/NavigatorContainer";
import Page from "./components/pages/Page";
import { $$ } from "./utils/Dom";

class App {
  restaurantList: Restaurant[];
  target: HTMLElement;

  constructor(body: Element) {
    this.target = <HTMLElement>body;
    this.restaurantList = restaurantListHandler.getRestaurants();

    Header.initialize(this.target);
    RestaurantFormBottomSheet.initialize(
      this.target,
      this.addRestaurantItemToList.bind(this)
    );
    NavigatorContainer.initialize(this.target, this.navigateToPage);

    this.navigateToPage("total");
  }

  addRestaurantItemToList(data: Restaurant) {
    restaurantListHandler.addRestaurant(data);
    this.restaurantList = restaurantListHandler.getRestaurants();

    RestaurantList.updateRestaurantList(this.restaurantList);
  }

  navigateToPage = (pageName: string) => {
    this.deletePageSection();

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

  deletePageSection() {
    $$("section")?.forEach((section) => {
      section.remove();
    });
  }
}

export default App;
