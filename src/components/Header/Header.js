import "./Header.css";

const createHeader = ({ title }) => {
  const header = document.createElement("header");
  header.classList.add("gnb");

  header.insertAdjacentHTML(
    "beforeend",
    `<h1 class="gnb__title text-title">${title}</h1>
    <button type="button" class="gnb__button" aria-label="음식점 추가">
      <img src="images/add-button.png" alt="음식점 추가" />
    </button>`
  );

  return header;
};

export default createHeader;
