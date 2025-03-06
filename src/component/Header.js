import IconButton from "./IconButton.js";
import AddLunchModal from "./AddLunchModal.js";

const Header = {
  create() {
    const headerElement = document.createElement("header");
    headerElement.classList.add("gnb");
    headerElement.innerHTML = `<h1 class="gnb__title text-title">점심 뭐 먹지</h1>`;
    headerElement.appendChild(
      IconButton.create({
        src: "./templates/add-button.png",
        onClick: () => AddLunchModal.open(),
        label: "음식점 추가",
      })
    );

    return headerElement;
  },
};

export default Header;
