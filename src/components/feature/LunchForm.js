import Component from "../../core/Component.js";
import Text from "../common/Text.js";
import Select from "../common/Select.js";
import TextArea from "../common/TextArea.js";
import Button from "../common/Button.js";

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
    const lunchText = new Text();
    lunchText.setProps({
      content: "새로운 음식점",
      classList: ["w-full", "text-2xl"],
    });
    return lunchText.template();
  }

  renderCategory() {
    const categoryLabel = new Text();
    categoryLabel.setProps({
      content: "카테고리",
      classList: ["text-lg", "slate-500"],
    });

    const categorySelect = new Select();
    categorySelect.setProps({
      options: ["한식", "중식", "일식", "아시안", "양식", "기타"],
      id: "category",
    });

    return `
    <div class="w-full flex flex-col">
      ${categoryLabel.template()}
      ${categorySelect.template()}
    </div>
    `;
  }

  renderStoreName() {
    const storeNameLabel = new Text();
    storeNameLabel.setProps({
      content: "이름",
      classList: ["text-lg", "slate-500"],
    });

    const storeName = new TextArea();
    storeName.setProps({
      rows: 1,
      maxLength: 14,
      onInput: (e) => {
        this.setState({ storeName: e.target.value });
      },
      placeHolder: "피양콩할마니",
      classList: ["h-44", "rounded-lg", "resize-none"],
      id: "storeName",
    });

    return `
      <div class="w-full flex flex-col">
        ${storeNameLabel.template()}
        ${storeName.template()}
      </div>
    `;
  }

  renderLocation() {
    const locationLabel = new Text();
    locationLabel.setProps({
      content: "거리(도보 이동 시간)",
      classList: ["text-lg", "slate-500"],
    });

    const location = new Select();
    location.setProps({
      options: ["5분", "10분", "15분", "20분", "30분"],
      id: "location",
    });

    return `
        <div class="w-full flex flex-col">
          ${locationLabel.template()}
          ${location.template()}
        </div>
    `;
  }

  renderDescription() {
    const descriptionLabel = new Text();
    descriptionLabel.setProps({
      content: "설명",
      classList: ["text-lg", "slate-500"],
    });

    const description = new TextArea();
    description.setProps({
      rows: 3,
      maxLength: 255,
      placeHolder: "설명을 입력해주세요. 설명은 최대 255글자까지 가능합니다.",
      classList: ["h-90", "rounded-lg", "resize-none"],
      id: "description",
    });

    return `
      <div class="w-full flex flex-col">
        ${descriptionLabel.template()}
        ${description.template()}
      </div>
    `;
  }

  renderReference() {
    const referenceLabel = new Text();
    referenceLabel.setProps({
      content: "참고 링크",
      classList: ["text-lg", "slate-500"],
    });

    const reference = new TextArea();
    reference.setProps({
      rows: 1,
      maxLength: 100,
      placeHolder: "https://techcourse.woowahan.com/",
      classList: ["h-44", "rounded-lg", "resize-none"],
      id: "reference",
    });

    return `
      <div class="w-full flex flex-col">
        ${referenceLabel.template()}
        ${reference.template()}
      </div>
    `;
  }

  renderButton() {
    const cancelBtn = new Button();
    cancelBtn.setProps({
      text: "취소하기",
      variant: "secondary",
      id: "cancelBtn",
      classList: ["w-full"],
    });

    const submitBtn = new Button();
    submitBtn.setProps({
      text: "추가하기",
      variant: "primary",
      id: "submitBtn",
      classList: ["w-full"],
    });

    return `
        <div class="w-full flex gap-16 flex-row justify-between items-center">
          ${cancelBtn.template()}
          ${submitBtn.template()}
        </div>
      `;
  }

  template() {
    return `
    <div class="flex flex-col justify-start items-start gap-32 mt-32" >
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
}
