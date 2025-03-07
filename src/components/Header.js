function Header({ TITLE, LABEL }) {
  const headerElement = document.createElement("header");
  headerElement.classList.add("gnb");
  headerElement.innerHTML = `
    <h1 class="gnb__title text-title">${TITLE}</h1>
    <button type="button" class="gnb__button" aria-label=${LABEL}>
      <img src="./public/add-button.png" alt=${LABEL} />
    </button>
    `;
  return headerElement;
}

export default Header;
