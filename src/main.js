import Application from "./Application";

addEventListener("load", () => {
  const $app = document.querySelector("#app");

  const application = new Application();

  $app.appendChild(application.element);
});
