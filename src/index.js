import AddRestaurant from "./components/AddRestaurant";
import BottomSheet from "./components/BottomSheet";
import NavBar from "./components/NavBar";
import "./css/style.css";

const handleBottomSheet = () => {
  //추가 동작 구현
  const closeBottomSheet = document.getElementById("closeBottomSheet");
  closeBottomSheet.addEventListener("click", () => {
    const bottomSheet = document.getElementById("bottomSheet");
    bottomSheet.classList.remove("modal--open");
  });
};

// navBar
const navBar = document.getElementById("navBar");
navBar.innerHTML = NavBar();

// 음식점 추가 바텀시트 열기
const bottomSheet = document.getElementById("bottomSheet");
const addButton = document.getElementById("addButton");
addButton.addEventListener("click", () => {
  bottomSheet.classList.add("modal--open");
  bottomSheet.innerHTML = BottomSheet(AddRestaurant());
  handleBottomSheet();
});
