import FormFieldContainer from "./FormFieldContainer.js";

export const MAX_DESCRIPTION_LENGTH = 300;

const Description = () => {
  const contents = /*html*/ `
    <textarea name="description" id="description" cols="30" rows="5" maxlength="${MAX_DESCRIPTION_LENGTH}" data-testid="description"></textarea>
    <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
  `;

  return FormFieldContainer({ contents, label: "설명", name: "description" });
};

export default Description;
