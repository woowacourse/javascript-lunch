{
  /* <div class="button-container">
<button
  type="button"
  class="button button--secondary text-caption"
  id="cancel-button"
>
  취소하기
</button>
<button
  class="button button--primary text-caption"
  id="register-button"
>
  추가하기
</button>
</div> */
}
const Button = ({ text, style, onClick, type = "submit", id }) => {
  const button = document.createElement("button");

  button.textContent = text;
  button.setAttribute("type", type);
  button.setAttribute("id", id);
  button.classList.add("button", "text-caption");
  button.classList.add(style);

  button.addEventListener("click", onClick);

  return button;
};

export default Button;
