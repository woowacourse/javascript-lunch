const ButtonPrimary = (text: string, className?: string) => /*html*/ `
<button class="button button--primary text-caption ${className || ""}">
    ${text}
</button>
`;
export default ButtonPrimary;
