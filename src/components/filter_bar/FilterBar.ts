import { filterBarTemplate } from "./template";

function FilterBar() {
  const render = () => {
    const mainContainer = document.getElementById("mainContainer");
    const main = document.createElement("main");
    main.setAttribute("class", "main");
    main.innerHTML += filterBarTemplate;

    if (mainContainer) {
      mainContainer.appendChild(main);
    }
  };

  return {
    render,
  };
}

export default FilterBar;
