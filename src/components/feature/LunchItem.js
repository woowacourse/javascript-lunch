import Component from "../../core/Component.js";
import Restaurant from "../../domain/Restaurant.js";
import CircleIcon from "../common/CircleIcon.js";
import Icon from "../common/Icon.js";
import Text from "../common/Text.js";

export const CATEGORY_IMAGE = {
  한식: "category-korean",
  중식: "category-chinese",
  일식: "category-japanese",
  아시안: "category-asian",
  양식: "category-western",
  기타: "category-etc",
};

export default class LunchItem extends Component {
  setDefaultProps() {
    this.props = {
      id: 0,
      storeName: "",
      distance: "",
      category: "",
      description: "",
      isFavorite: false,
      onClick: () => {},
    };
  }

  renderStoreName() {
    const storeName = this.addChild(Text);
    storeName.setProps({
      content: this.props.storeName,
      classList: ["text-xl"],
      id: "store-name-item",
    });

    return storeName.template();
  }

  renderDistance() {
    const distance = this.addChild(Text);
    distance.setProps({
      content: `캠퍼스 내 ${this.props.distance}분`,
      classList: ["text-lg", "primary-500"],
      id: "distance-item",
    });

    return distance.template();
  }

  renderDescription() {
    if (!this.props.description) return "";
    const description = this.addChild(Text);
    description.setProps({
      content: this.props.description,
      classList: ["text-lg", "my-8"],
      styles: {
        display: "-webkit-box",
        "-webkit-line-clamp": 2,
        "-webkit-box-orient": "vertical",
      },
      id: "description-item",
    });

    return description.template();
  }

  renderCircleIcon() {
    const icon = this.addChild(CircleIcon);
    icon.setProps({
      iconName: CATEGORY_IMAGE[this.props.category],
      id: "category-item",
    });

    return icon.template();
  }

  renderFavoriteIcon() {
    const favoriteIcon = this.addChild(Icon);
    favoriteIcon.setProps({
      size: "32",
      iconName: this.props.isFavorite
        ? "favorite-icon-filled"
        : "favorite-icon-lined",
      id: "favorite-icon-item",
    });

    return favoriteIcon.template();
  }

  dispatchFavoriteToggleEvent() {
    Restaurant.toggleFavorite(this.props.id);
    const event = new CustomEvent("favoriteToggled");
    document.dispatchEvent(event);
  }

  handleFavoriteButtonClick(e) {
    const favoriteButton = e.target.closest(".favorite-button");
    if (favoriteButton && Number(favoriteButton.dataset.id) === this.props.id) {
      e.stopPropagation();
      this.dispatchFavoriteToggleEvent();
      favoriteButton.innerHTML = this.renderFavoriteIcon();
      return true;
    }
    return false;
  }

  handleLunchItemClick(e) {
    const lunchItem = e.target.closest(`#lunch-item-${this.props.id}`);
    if (lunchItem) {
      this.props.onClick();
      return true;
    }
    return false;
  }

  setEvent() {
    document.removeEventListener("click", this.handleClickLunchItem);

    this.handleClickLunchItem = (e) => {
      if (this.handleFavoriteButtonClick(e)) return;
      if (this.handleLunchItemClick(e)) return;
    };

    document.addEventListener("click", this.handleClickLunchItem);
  }

  createHeaderSection() {
    return `
      <div class="flex flex-row justify-between items-start w-full">
        <div class="flex flex-col items-start">
          ${this.renderStoreName()}
          ${this.renderDistance()}
        </div>
        <div class="flex flex-row items-center">
          <button class="favorite-button" data-id="${
            this.props.id
          }" style="background: none; border: none;">
            ${this.renderFavoriteIcon()}
          </button>
        </div>
      </div>
    `;
  }

  template() {
    return `
      <div id="lunch-item-${this.props.id}" data-id="${this.props.id}" 
           class="flex flex-row items-start gap-16 py-16 px-8 border-b-slate" 
           style="height: auto;">
        <div>
          ${this.renderCircleIcon()}
        </div>
        <div class="flex flex-col overflow-hidden" style="width: 280px;">
          ${this.createHeaderSection()}
          ${this.renderDescription()}
        </div>
      </div>
    `;
  }

  render(props, targetElement = `#lunch-item-${this.props.id}`) {
    if (props) this.setProps(props);
    super.render(props, targetElement);
  }
}
