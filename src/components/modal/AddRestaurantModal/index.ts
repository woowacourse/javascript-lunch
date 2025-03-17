import { BaseProps } from "../../../../types/common.js";
import { Restaurant } from "../../../entities";
import { isError } from "../../../utils";
import validateRestaurantForm from "../../../validators/validateRestaurantForm.js";
import Modal from "../Modal.js";
import Category from "./Category.js";
import Description from "./Description.js";
import Distance from "./Distance.js";
import Link from "./Link.js";
import RestaurantName from "./RestaurantName.js";

interface AddRestaurantModalProps extends BaseProps {
  submit: (newRestaurant: Restaurant) => void;
}

class AddRestaurantModal extends Modal<AddRestaurantModalProps> {
  override setup() {
    super.setup();
    this.setupTriggerButtons([".gnb__button"]);

    this.eventBindings.push({
      action: "submit-restaurant-form",
      eventType: "submit",
      handler: (event: Event) => this.handleSubmit(event),
    });
  }

  private handleSubmit = (event: Event) => {
    event.preventDefault();

    try {
      const formData = new FormData(event.target as HTMLFormElement);
      const rawData = Object.fromEntries(formData.entries());
      const data = this.castFormDataToRestaurant(rawData);

      validateRestaurantForm(data);
      this.props.submit(data);
      this.close();
    } catch (error) {
      if (isError(error)) alert(error.message);
    }
  };

  private castFormDataToRestaurant = (
    data: Record<string, FormDataEntryValue>
  ): Restaurant => {
    return {
      id: this.generateId(),
      category: data.category as Restaurant["category"],
      name: data.name as Restaurant["name"],
      distance: parseInt(data.distance as string, 10) as Restaurant["distance"],
      description: data.description
        ? (data.description as Restaurant["description"])
        : undefined,
      link: data.link ? (data.link as Restaurant["link"]) : undefined,
    };
  };

  private generateId = (): string =>
    `restaurant-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  override contents() {
    return /*html */ `
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form id='submit-restaurant-form' data-action="submit-restaurant-form" data-testid='submit-restaurant-form'>
        ${Category()}
        ${RestaurantName()}
        ${Distance()}
        ${Description()}
        ${Link()}

        <div class="button-container">
          <button type="button" data-action="close-modal" class="button button--secondary text-caption" data-testid="cancel-submit-restaurant-form">취소하기</button>
          <button class="button button--primary text-caption">추가하기</button>
        </div>
      </form>
    `;
  }
}

export default AddRestaurantModal;
