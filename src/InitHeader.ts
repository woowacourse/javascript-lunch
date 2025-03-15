import Header from "./ui/Header";

export default function InitHeader() {
  const $headerContainer = document.querySelector(".gnb") as HTMLElement;
  Header($headerContainer);
}
