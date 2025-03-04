export function IconButton({ imgSrc, label }) {
  const container = document.createElement("div");
  container.innerHTML = ` <button type="button" class="gnb__button" aria-label=${label}>
    <img src=${imgSrc} alt="${label}" />
      </button>`;

  return container.firstElementChild;
}
