import "./resources.js";
import { createHeader } from "./components/Header.ts";

// 1. 컴포넌트를 따로 만든다

const header = createHeader({
  title: "점심 뭐 먹니?",
  imageSource: "./add-button.png",
  onButtonClick: () => alert("안녕"),
});

const modal = document.createElement("div");

const modalBackdrop = document.createElement("div");
const modalContainer = document.createElement("div");

modal.classList.add("modal", "modal--open");
modalBackdrop.classList.add("modal-backdrop");
modalContainer.classList.add("modal-container");

// 2. 컴포넌트를 결합한다

modal.appendChild(modalBackdrop);
modal.appendChild(modalContainer);

// 3. 컴포넌트를 document에 붙인다.

const container = document.querySelector("#container");
container.prepend(header);
container.appendChild(modal);
