import { BaseProps } from "../../../../types/common.js";
import { Restaurant } from "../../../entities";
import RestaurantItem from "../../RestaurantItem.js";
import Modal from "../Modal.js";

interface RestaurantDetailModalProps extends BaseProps {
  restaurantId: Restaurant["id"];
  restaurants: Restaurant[];
  isFavorite: () => boolean;
  delete: (id: Restaurant["id"]) => void;
  toggleFavorite: () => void;
}

class RestaurantDetailModal extends Modal<RestaurantDetailModalProps> {
  override setup() {
    super.setup();

    this.eventBindings.push(
      {
        action: `delete-restaurant-${this.props.restaurantId}`,
        eventType: "click",
        handler: () => this.handleDelete(),
      },
      {
        action: "toggle-favorite",
        eventType: "click",
        handler: () => this.props.toggleFavorite(),
      }
    );
  }

  private handleDelete() {
    this.props.delete(this.props.restaurantId);
    this.close();
  }

  override contents() {
    const { restaurants, restaurantId } = this.props;
    const data = restaurants.find(({ id }) => id === restaurantId);
    if (!data) return "";

    const { id, category, name, distance, description, link } = data;

    return /* html */ `
        <div class="restaurant restaurant-detailModal" data-testid="restaurant-detail-modal">
            <div style="display: flex; width: 100%; justify-content: space-between;">
              ${RestaurantItem.CategoryIcon(category)}
              ${RestaurantItem.FavoriteButton(id, this.props.isFavorite())}
            </div>
            <div class="restaurant__info">
                ${RestaurantItem.Name(name)}
                ${RestaurantItem.Distance(distance)}
                ${RestaurantItem.Description(description)}
                ${RestaurantItem.Link(link)}
            </div>
        </div>
        <div class="button-container">
          <button data-action="delete-restaurant-${
            this.props.restaurantId
          }" class="button button--secondary text-caption" data-testid="delete-restaurant">삭제하기</button>
          <button data-action="close-modal" class="button button--primary text-caption" data-testid="close-restaurant-detail-modal">닫기</button>
        </div>
    `;
  }
}

export default RestaurantDetailModal;
