import Component from "../../core/Component.js";
import { RestaurantFacade } from "../../domain/RestaurantFacade.ts";
import { Button, CircleIcon, Icon, Text } from "../common/index.js";
import { CATEGORY_IMAGE } from "./LunchItem.js";

export default class LunchItemDetail extends Component {
  setDefaultProps() {
    this.props = {
      id: 0,
      storeName: "",
      distance: "",
      category: "",
      description: "",
      link: "",
      isFavorite: false,
    };
  }

  renderCircleIcon() {
    const icon = this.addChild(CircleIcon, {
      iconName: CATEGORY_IMAGE[this.props.category],
      id: "category-detail-item",
    });

    return icon.template();
  }

  renderFavoriteIcon() {
    const favoriteIcon = this.addChild(Icon, {
      size: "32",
      iconName: this.props.isFavorite
        ? "favorite-icon-filled"
        : "favorite-icon-lined",
      id: "favorite-detail-item",
    });

    return favoriteIcon.template();
  }

  renderStoreName() {
    const storeName = this.addChild(Text, {
      content: this.props.storeName,
      classList: ["text-xl"],
      id: "store-name-detail-item",
    });

    return storeName.template();
  }

  renderDistance() {
    const distance = this.addChild(Text, {
      content: `캠퍼스 내 ${this.props.distance}분`,
      classList: ["text-lg", "primary-500"],
      id: "distance-detail-item",
    });

    return distance.template();
  }

  renderDescription() {
    if (!this.props.description) return "";
    const description = this.addChild(Text, {
      content: this.props.description,
      classList: ["text-lg", "my-8"],
      id: "description-detail-item",
    });

    return description.template();
  }

  renderLink() {
    if (!this.props.link) return "";
    const link = this.addChild(Text, {
      content: this.props.link,
      classList: ["text-lg", "slate-500"],
      id: "link-detail-item",
    });

    return `
    <a href="${
      this.props.link
    }" target="_blank" style="text-decoration: underline; color: black;">${link.template()}</a>
    `;
  }

  renderButton() {
    const deleteBtn = this.addChild(Button, {
      text: "삭제하기",
      variant: "secondary",
      onClick: (e) => this.handleDeleteItem(e),
      classList: ["w-full"],
      id: "delete-btn",
    });

    const cancelBtn = this.addChild(Button, {
      text: "닫기",
      variant: "primary",
      classList: ["w-full"],
      id: "cancel-btn",
    });

    return `
      <div class="w-full flex gap-16 flex-row justify-between items-center">
        ${deleteBtn.template()}
        ${cancelBtn.template()}
      </div>
    `;
  }

  handleToggleFavorite() {
    this.props.isFavorite = !this.props.isFavorite;
    RestaurantFacade.toggleFavorite(this.props.id);
    document.dispatchEvent(new CustomEvent("itemChange"));
  }

  handleDeleteItem(e) {
    e.stopPropagation();
    RestaurantFacade.removeById(this.props.id);
  }

  setEvent() {
    if (!this.props) return;
    document.removeEventListener("click", this.handleFavoriteClick);

    this.handleFavoriteClick = (e) => {
      const favoriteButton = e.target.closest("#favorite-detail-button");
      if (favoriteButton && favoriteButton.dataset.id == this.props.id) {
        e.preventDefault();
        this.handleToggleFavorite();
        favoriteButton.innerHTML = this.renderFavoriteIcon();
      }
    };

    document.addEventListener("click", this.handleFavoriteClick);
  }

  template() {
    return `
    <div id="lunch-item-detail" class="flex flex-col items-start gap-16 mt-32 mb-32">
      <div class="flex flex-row items-start justify-between w-full">
        <div class="flex flex-col gap-16">
        ${this.renderCircleIcon()}
        ${this.renderStoreName()}
        </div>
        <button type="button" id="favorite-detail-button" data-id="${
          this.props.id
        }" style="background: none; border: none;">
          ${this.renderFavoriteIcon()}
        </button>
      </div>
      ${this.renderDistance()}
      ${this.renderDescription()}
      ${this.renderLink()}
      ${this.renderButton()}
    </div>`;
  }
}
