import EventComponent from "../abstract/EventComponent";
import { ACTION_TYPES, FILTER_EVENT } from "../constants/event";
import { $ } from "../utils/selector";

type SelectedBar = "all" | "favorite";

const selectedBarMenu: Record<SelectedBar, SelectedBar> = {
  all: "all",
  favorite: "favorite",
};

export default class HeaderTab extends EventComponent {
  private selectedBar: SelectedBar;
  private changeSelectedBind: (clickedMenu: SelectedBar) => void;

  constructor() {
    super();
    this.selectedBar = "all";
    this.changeSelectedBind = this.changeSelected.bind(this);
  }

  protected getTemplate(): string {
    return `
    <nav class="header-nav">
        <ul>
            <li id="selectAllRestaurant" ${
              this.selectedBar === selectedBarMenu.all ? 'class="active"' : ""
            }>모든 음식점</li>
            <li id="selectFavoriteRestaurant" ${
              this.selectedBar === selectedBarMenu.favorite
                ? 'class="active"'
                : ""
            }>자주 가는 음식점</li>
        </ul>
    </nav>
    `;
  }

  setEvent() {
    $("#selectAllRestaurant")?.addEventListener("click", () =>
      this.changeSelectedBind(selectedBarMenu.all)
    );

    $("#selectFavoriteRestaurant")?.addEventListener("click", () =>
      this.changeSelectedBind(selectedBarMenu.favorite)
    );
  }

  private changeSelected(clickedMenu: SelectedBar) {
    if (this.selectedBar === clickedMenu) return;
    this.selectedBar = clickedMenu;
    const allRestaurantElement = $("#selectAllRestaurant");
    const favoriteRestaurantElement = $("#selectFavoriteRestaurant");

    if (clickedMenu === "all") {
      allRestaurantElement?.classList.add("active");
      favoriteRestaurantElement?.classList.remove("active");
    } else {
      allRestaurantElement?.classList.remove("active");
      favoriteRestaurantElement?.classList.add("active");
    }

    this.handleShowFilterBar(this.selectedBar);
  }

  private handleShowFilterBar(selectedBar: SelectedBar) {
    const action =
      selectedBar === "all" ? ACTION_TYPES.open : ACTION_TYPES.close;

    this.dispatchEvent(
      new CustomEvent(FILTER_EVENT.showFilter, {
        bubbles: true,
        detail: {
          action,
        },
      })
    );
  }

  protected removeEvent(): void {
    $("#selectAllRestaurant")?.removeEventListener("click", () =>
      this.changeSelectedBind(selectedBarMenu.all)
    );

    $("#selectFavoriteRestaurant")?.removeEventListener("click", () =>
      this.changeSelectedBind(selectedBarMenu.favorite)
    );
  }
}
