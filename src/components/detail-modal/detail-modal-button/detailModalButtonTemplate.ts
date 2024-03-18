import ButtonBase from "../../common/buttons/button";

const detailModalButtonTemplate = /*html*/ `
<div class="button-container detail-modal-button-container">
    ${ButtonBase("삭제하기", "button--secondary", "button--remove")}
    ${ButtonBase("닫기", "button--primary", "button--close")}
</div>
`;

export default detailModalButtonTemplate;
