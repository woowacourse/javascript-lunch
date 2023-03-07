import BottomSheet from ".";

export const closeBottomSheet = () => {
  const bottomSheet = document.getElementById("bottomSheet");
  if (bottomSheet instanceof BottomSheet) {
    bottomSheet.close();
  }
};
