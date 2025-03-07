const $header = (HEADER_INFO) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.innerHTML += `<h1 class="gnb__title text-title">${HEADER_INFO.title}</h1>`;
  header.innerHTML += `<button type="button" class="gnb__button" aria-label="${HEADER_INFO.buttonTitle}">
      <img src="${HEADER_INFO.buttonImage}" alt="${HEADER_INFO.buttonTitle}">
    </button>`;

  return header;
};

export default $header;
