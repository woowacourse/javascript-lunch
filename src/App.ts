import "../templates/style.css";
import "../templates/add-button.png";
import "../templates/category-asian.png";
import "../templates/category-chinese.png";
import "../templates/category-etc.png";
import "../templates/category-japanese.png";
import "../templates/category-korean.png";
import "../templates/category-western.png";
import "../templates/favorite-icon-filled.png";
import "../templates/favorite-icon-lined.png";
import BaseComponent from "./util/BaseComponent";
import RestaurantList from "./domain/RestaurantList";
import Main from "./view/components/Main";
import Header from "./view/components/Header";
import RestaurantFormModal from "./view/components/RestaurantFormModal";
import { Restaurant } from "./types";

interface AppProps {
  restaurantList: RestaurantList;
}
class App extends BaseComponent<AppProps, {}> {
  protected state: {};

  constructor($root: HTMLElement, props: AppProps) {
    super($root, props);
    this.state = {};
  }

  protected setEvent(): void {}

  protected compose(): void {
    this.$root.replaceChildren(
      new Header({
        onButtonClick: this.onHeaderButtonClick.bind(this),
      }).render(),
      new Main({
        restaurantList: this.props.restaurantList,
      }).render()
    );
  }

  private onHeaderButtonClick() {
    const formModal = new RestaurantFormModal({
      onFormSubmit: (restaurant: Restaurant) => {
        this.props.restaurantList.add(restaurant);
        this.render();
      },
    });
    this.$root.appendChild(formModal.render());
  }
}

export default App;
