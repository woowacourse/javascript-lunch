const BackDrop = (handleCloseModal) => {
  const backDrop = document.createElement("div");
  backDrop.classList.add("modal-backdrop");

  backDrop.addEventListener("click", handleCloseModal);

  return backDrop;
};

export default BackDrop;
