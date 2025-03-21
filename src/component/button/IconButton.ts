import { IconButtonType } from "../../types/component/ButtonType";

export function IconButton({
  imgSrc,
  label,
  onClick = () => {},
}: IconButtonType) {
  const container = document.createElement("div");
  container.innerHTML = `
      <button type="button" class="gnb__button" aria-label="${label}">
      <img src="${imgSrc}" alt="${label}" /></button
    >
    `;

  const ButtonContainer = container.querySelector("button");

  if (ButtonContainer)
    ButtonContainer.addEventListener("click", (event: Event) => {
      onClick(event);
    });

  return container.firstElementChild;
}
