import Component from "../../core/Component.js";
import Text from "../common/Text.js";
import Select from "../common/Select.js";
import TextArea from "../common/TextArea.js";
import Button from "../common/Button.js";
import BottomSheet from "../common/BottomSheet.js";
import Validator from "../../utils/Validator.js";
import Restaurant from "../../domain/Restaurant.js";
import { categories, distances } from "../../types/restaurant.types.js";

export default class LunchForm extends Component {
  initState() {
    this.state = {
      category: "",
      storeName: "",
      distance: "",
      description: "",
      link: "",
    };
  }

  renderLunchText() {
    const lunchText = this.addChild(Text);
    lunchText.setProps({
      content: "새로운 음식점",
      classList: ["w-full", "text-2xl"],
      id: "lunch-form-title",
    });
    return lunchText.template();
  }

  renderCategory() {
    const categoryLabel = this.addChild(Text);
    categoryLabel.setProps({
      content: "카테고리",
      required: true,
      classList: ["text-lg", "slate-500"],
      id: "category-label",
    });

    const categorySelect = this.addChild(Select);
    categorySelect.setProps({
      options: categories,
      onChange: (value) => this.setState({ category: value }),
      id: "category-select",
    });

    return `
    <div class="w-full h-64 flex flex-col">
      ${categoryLabel.template()}
      ${categorySelect.template()}
    </div>
    `;
  }

  renderStoreName() {
    const storeNameLabel = this.addChild(Text);
    storeNameLabel.setProps({
      content: "이름",
      required: true,
      classList: ["text-lg", "slate-500"],
      id: "store-name-label",
    });

    const storeName = this.addChild(TextArea);
    storeName.setProps({
      rows: 1,
      maxLength: 14,
      placeHolder: "피양콩할마니",
      onInput: (value) => this.setState({ storeName: value }),
      classList: ["h-44", "rounded-lg", "resize-none"],
      id: "store-name-textarea",
      isRequired: true,
    });

    return `
      <div class="w-full flex flex-col">
        ${storeNameLabel.template()}
        ${storeName.template()}
      </div>
    `;
  }

  renderDistance() {
    const distanceLabel = this.addChild(Text);
    distanceLabel.setProps({
      content: "거리(도보 이동 시간)",
      required: true,
      classList: ["text-lg", "slate-500"],
      id: "distance-label",
    });

    const distance = this.addChild(Select);
    distance.setProps({
      options: distances.map((distance) => `${distance}분`),
      onChange: (value) => this.setState({ distance: value }),
      id: "distance-select",
    });

    return `
        <div class="w-full h-64 flex flex-col">
          ${distanceLabel.template()}
          ${distance.template()}
        </div>
    `;
  }

  renderDescription() {
    const descriptionLabel = this.addChild(Text);
    descriptionLabel.setProps({
      content: "설명",
      required: false,
      classList: ["text-lg", "slate-500"],
      id: "description-label",
    });

    const description = this.addChild(TextArea);
    description.setProps({
      rows: 3,
      maxLength: 255,
      isRequired: false,
      placeHolder: "설명을 입력해주세요. 설명은 최대 255글자까지 가능합니다.",
      onInput: (value) => this.setState({ description: value }),
      classList: ["h-90", "rounded-lg", "resize-none"],
      id: "description-textarea",
    });

    return `
      <div class="w-full flex flex-col">
        ${descriptionLabel.template()}
        ${description.template()}
      </div>
    `;
  }

  renderLink() {
    const linkLabel = this.addChild(Text);
    linkLabel.setProps({
      content: "참고 링크",
      classList: ["text-lg", "slate-500"],
      id: "link-label",
    });

    const link = this.addChild(TextArea);
    link.setProps({
      rows: 1,
      maxLength: 100,
      isRequired: false,
      placeHolder: "https://techcourse.woowahan.com/",
      onInput: (value) => this.setState({ link: value }),
      classList: ["h-44", "rounded-lg", "resize-none"],
      id: "link-textarea",
    });

    return `
      <div class="w-full flex flex-col">
        ${linkLabel.template()}
        ${link.template()}
      </div>
    `;
  }

  renderButton() {
    const cancelBtn = this.addChild(Button);
    cancelBtn.setProps({
      text: "취소하기",
      variant: "secondary",
      classList: ["w-full"],
      onClick: () => this.handleReset(),
      id: "cancel-btn",
    });

    const submitBtn = this.addChild(Button);
    submitBtn.setProps({
      text: "추가하기",
      variant: "primary",
      classList: ["w-full"],
      onClick: (e) => this.handleSubmit.bind(this),
      id: "submit-btn",
    });

    return `
        <div class="w-full flex gap-16 flex-row justify-between items-center">
          ${cancelBtn.template()}
          ${submitBtn.template()}
        </div>
      `;
  }

  handleSubmit(e) {
    e.preventDefault();
    const lastId = Restaurant.getLastRestaurantId();
    const newId = lastId + 1;
    new Restaurant({
      id: newId,
      storeName: this.state.storeName,
      distance: this.state.distance.replace("분", ""),
      category: this.state.category,
      description: this.state.description,
      link: this.state.link,
      isFavorite: false,
    }).save();

    this.handleReset();
  }

  handleReset() {
    this.setState({
      category: "",
      storeName: "",
      distance: "",
      description: "",
      link: "",
    });
  }

  validateLunchForm() {
    Validator.category(this.state.category);
    Validator.distance(this.state.distance);
    Validator.link(this.state.link);
  }

  template() {
    return `
    <form id="lunch-form" class="flex flex-col justify-start items-start gap-32 mt-32 mb-32" >
      ${this.renderLunchText()}
      ${this.renderCategory()}
      ${this.renderStoreName()}
      ${this.renderDistance()}
      ${this.renderDescription()}    
      ${this.renderLink()}
      ${this.renderButton()}
    </form>
    `;
  }

  render(props) {}
}
