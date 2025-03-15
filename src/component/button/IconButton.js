export function IconButton({ cssType = "primary", name, imgSrc, label, onClick = () => {} }) {
  const container = document.createElement("div");
  container.innerHTML = `
    <button type="button" class="icon-button--${cssType}" aria-label="${label}" name=${name}>
    <img src="${imgSrc}" alt="${label}" /></button
  >
  `;

  container.querySelector("button").addEventListener("click", () => {
    onClick();
  });

  return container.firstElementChild;
}
