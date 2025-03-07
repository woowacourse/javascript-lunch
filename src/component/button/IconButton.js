export function IconButton({ imgSrc, label, onClick = () => {} }) {
  const container = document.createElement("div");
  container.innerHTML = `
    <button type="button" class="gnb__button" aria-label="${label}">
    <img src="${imgSrc}" alt="${label}" /></button
  >
  `;

  container.querySelector("button").addEventListener("click", () => {
    onClick();
  });

  return container.firstElementChild;
}
