const modalOpenHandler = () => {
  const modal = document.getElementsByClassName("modal")[0];
  const openButton = document.getElementsByClassName("gnb__button")[0];

  openButton.addEventListener("click", () => {
    modal.classList.add("modal--open");
  });
};
export default modalOpenHandler;
