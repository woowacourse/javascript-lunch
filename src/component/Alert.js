export const Alert = ({ message: message }) => {
  const alert = document.createElement("div");
  alert.classList.add("alert");
  alert.classList.add("text-body");

  alert.innerText = message;

  return alert;
};
