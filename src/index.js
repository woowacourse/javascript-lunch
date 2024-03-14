import "./resources.js";

// 1. 컴포넌트를 따로 만든다

const header = document.createElement("header");

const headerTitle = document.createElement("h1");
const imageButton = document.createElement("button");
const image = document.createElement("img");

header.classList.add("gnb");
headerTitle.classList.add("gnb__title", "text-title");
imageButton.classList.add("gnb__button");

headerTitle.textContent = "점심 뭐 먹지";
image.setAttribute("type", "button");
image.setAttribute("src", "./add-button.png");

// 2. 컴포넌트를 결합한다

imageButton.appendChild(image);
header.appendChild(headerTitle);
header.appendChild(imageButton);

// 3. 컴포넌트를 document에 붙인다.

const container = document.querySelector("#container");
container.prepend(header);
