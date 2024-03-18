import ButtonBase from "../../common/buttons/button";

const modalButtonTemplate = /*html*/ `
<div class="button-container">
    ${ButtonBase("취소하기", "button--secondary")}
    ${ButtonBase("추가하기", "button--primary")}
</div>
`;

export default modalButtonTemplate;
