import Component from "../../core/Component.js";
import Text from "../common/Text.js";
import Select from "../common/Select.js";
import TextArea from "../common/TextArea.js";
import Button from "../common/Button.js";
import BottomSheet from "../common/BottomSheet.js";
import Validator from "../../utils/Validator.js";

export default class LunchForm extends Component {
  setDefaultProps() {
    this.props = {
      onAdd: () => {},
    };
  }

  initState() {
    this.state = {
      category: "",
      storeName: "",
      location: "",
      description: "",
      reference: "",
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
      options: ["한식", "중식", "일식", "아시안", "양식", "기타"],
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
    });

    return `
      <div class="w-full flex flex-col">
        ${storeNameLabel.template()}
        ${storeName.template()}
      </div>
    `;
  }

  renderLocation() {
    const locationLabel = this.addChild(Text);
    locationLabel.setProps({
      content: "거리(도보 이동 시간)",
      required: true,
      classList: ["text-lg", "slate-500"],
      id: "location-label",
    });

    const location = this.addChild(Select);
    location.setProps({
      options: ["5분", "10분", "15분", "20분", "30분"],
      onChange: (value) => this.setState({ location: value }),
      id: "location-select",
    });

    return `
        <div class="w-full h-64 flex flex-col">
          ${locationLabel.template()}
          ${location.template()}
        </div>
    `;
  }

  renderDescription() {
    const descriptionLabel = this.addChild(Text);
    descriptionLabel.setProps({
      content: "설명",
      classList: ["text-lg", "slate-500"],
      id: "description-label",
    });

    const description = this.addChild(TextArea);
    description.setProps({
      rows: 3,
      maxLength: 255,
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

  renderReference() {
    const referenceLabel = this.addChild(Text);
    referenceLabel.setProps({
      content: "참고 링크",
      classList: ["text-lg", "slate-500"],
      id: "reference-label",
    });

    const reference = this.addChild(TextArea);
    reference.setProps({
      rows: 1,
      maxLength: 100,
      placeHolder: "https://techcourse.woowahan.com/",
      onInput: (value) => this.setState({ reference: value }),
      classList: ["h-44", "rounded-lg", "resize-none"],
      id: "reference-textarea",
    });

    return `
      <div class="w-full flex flex-col">
        ${referenceLabel.template()}
        ${reference.template()}
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
      onClick: () => this.handleSubmit(),
      id: "submit-btn",
    });

    return `
        <div class="w-full flex gap-16 flex-row justify-between items-center">
          ${cancelBtn.template()}
          ${submitBtn.template()}
        </div>
      `;
  }

  handleSubmit() {
    const { onAdd } = this.props;

    this.props.onAdd({ ...this.state });
    this.handleReset();
  }

  handleReset() {
    this.setState({
      category: "",
      storeName: "",
      location: "",
      description: "",
      reference: "",
    });
  }

  template() {
    return `
    <div id="lunch-form" class="flex flex-col justify-start items-start gap-32 mt-32" >
      ${this.renderLunchText()}
      ${this.renderCategory()}
      ${this.renderStoreName()}
      ${this.renderLocation()}
      ${this.renderDescription()}    
      ${this.renderReference()}
      ${this.renderButton()}
    </div>
    `;
  }

  render(props) {}
}
