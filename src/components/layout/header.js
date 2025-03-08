const $header = ({ title, buttonTitle, buttonImage }) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.innerHTML += `<h1 class="gnb__title text-title">${title}</h1>`;
  header.innerHTML += `<button type="button" class="gnb__button" aria-label="${buttonTitle}">
      <img src="${buttonImage}" alt="${buttonTitle}">
    </button>`;

  return header;
};

export default $header;
