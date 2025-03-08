const $header = (headerInfo) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.innerHTML += `<h1 class="gnb__title text-title">${headerInfo.title}</h1>`;
  header.innerHTML += `<button type="button" class="gnb__button" aria-label="${headerInfo.buttonTitle}">
      <img src="${headerInfo.buttonImage}" alt="${headerInfo.buttonTitle}">
    </button>`;

  return header;
};

export default $header;
