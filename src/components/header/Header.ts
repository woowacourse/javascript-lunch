import { template } from "./template";

function Header() {
  const render = () => {
    const mainContainer = document.getElementById("mainContainer");
    const header = document.createElement("header");
    header.setAttribute("class", "headerContainer");
    header.innerHTML += template;

    if (mainContainer) {
      mainContainer.appendChild(header);
    }

    // const testButton = document.getElementById("button");

    // if (testButton) {
    //   testButton.addEventListener("click", () => {
    //     console.log("hi");
    //   });
    // }
  };
  return {
    render,
  };
}

export default Header;
