import ButtonPrimary from "../../common/buttons/button-primary";
import ButtonSecondary from "../../common/buttons/button-secondary";

const detailModalButtonTemplate = /*html*/ `
<div class="button-container detail-modal-button-container">
    ${ButtonSecondary("삭제하기", "button--remove")}
    ${ButtonPrimary("닫기", "button--close")}
</div>
`;

export default detailModalButtonTemplate;
