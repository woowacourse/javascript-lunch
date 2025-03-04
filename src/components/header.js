const $header = (HEADER_INFO) => {
    const header = document.createElement('header');
    header.classList.add('gnb');
    
    header.innerHTML += `<h1 class="gnb__title text-title">${HEADER_INFO.TITLE}</h1>`;
    header.innerHTML += `<button type="button" class="gnb__button" aria-label="${HEADER_INFO.BUTTON_TITLE}">
      <img src="${HEADER_INFO.BUTTON_IMAGE}" alt="${HEADER_INFO.BUTTON_TITLE}">
    </button>`;

    return header;
}

export default $header;