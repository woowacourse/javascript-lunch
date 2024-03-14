import "./resources.js";
import { createHeader } from "./components/Header.ts";
import Modal from "./components/Modal.ts";

// 1. 컴포넌트를 따로 만든다
const testModalContent = document.createElement("div");
testModalContent.innerHTML = `<h2>식당 추가</h2>`;
const modal = new Modal({ child: testModalContent });

const header = createHeader({
  title: "점심 뭐 먹니?",
  imageSource: "./add-button.png",
  onButtonClick: () => modal.toggle(),
});

// 2. 컴포넌트를 결합한다

// 3. 컴포넌트를 document에 붙인다.

const container = document.querySelector("#container");
container.prepend(header);
container.appendChild(modal.element);
