import createHeader from "./createHeader.js";
addEventListener("load", () => {
  const body = document.querySelector("body");
  const header = createHeader({ title: "점심 뭐 먹지" });
  console.log(header);

  body.prepend(header);
});
