const ButtonSecondary = (text: string, className?: string) => /*html*/ `
<button
    type="button"
    class="button button--secondary text-caption ${className}"
    >
    ${text}
</button>
`;
export default ButtonSecondary;
