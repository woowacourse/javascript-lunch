import BottomSheet from "../components/BottomSheet";

export const closeBottomSheet = () => {
  const bottomSheet = document.getElementById("bottomSheet");
  if (bottomSheet instanceof BottomSheet) {
    bottomSheet.close();
  }
};
