import BottomSheet from ".";

export const onClickBackdrop = () => {
  const modalBackdrop = document.getElementById("modalBackdrop");
  modalBackdrop?.addEventListener("click", () => {
    closeBottomSheet();
  });
};

export const openBottomSheet = (children: string) => {
  const bottomSheet = document.getElementById("bottomSheet");
  if (bottomSheet instanceof BottomSheet) {
    bottomSheet.classList.add("modal--open");
    bottomSheet.render(children);
  }
};

export const closeBottomSheet = () => {
  const bottomSheet = document.getElementById("bottomSheet");
  if (bottomSheet instanceof BottomSheet) {
    bottomSheet.classList.remove("modal--open");
    bottomSheet.render("");
  }
};
