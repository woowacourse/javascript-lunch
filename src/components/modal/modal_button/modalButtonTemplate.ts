import ButtonPrimary from "../../common/buttons/button-primary";
import ButtonSecondary from "../../common/buttons/button-secondary";

const modalButtonTemplate = /*html*/ `
<div class="button-container">
    ${ButtonSecondary("취소하기")}
    ${ButtonPrimary("추가하기")}
</div>
`;

export default modalButtonTemplate;
