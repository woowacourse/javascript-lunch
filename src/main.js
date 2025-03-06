import Application from "./Application";

export const html = (strings, ...args) => {
  console.log(strings, args);
};

addEventListener("load", () => {
  const $app = document.querySelector("#app");

  const application = new Application();

  $app.appendChild(application.element);
});
