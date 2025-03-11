const createHeader = ({ title }) => {
  const header = document.createElement("header");
  header.innerHTML = `
      <h1 class="gnb__title text-title">${title}</h1>
      <button type="button" class="gnb__button">
        <img src="images/add-button.png" alt="음식점 추가" />
      </button>`;
  header.classList.add("gnb");
  return header;
};

export default createHeader;
