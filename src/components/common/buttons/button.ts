const ButtonBase = (
  text: string,
  type: string,
  className?: string,
) => /*html*/ `
<button class="button ${type} text-caption ${className || ""}">
    ${text}
</button>
`;
export default ButtonBase;
