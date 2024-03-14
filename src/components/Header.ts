import { createImageButton } from "./ImageButton";

interface Props {
  title: string;
  imageSource: string;
  onButtonClick?: () => void;
}

export const createHeader = ({ title, imageSource, onButtonClick }: Props) => {
  const header = document.createElement("header");

  const headerTitle = document.createElement("h1");

  header.classList.add("gnb");
  headerTitle.classList.add("gnb__title", "text-title");

  headerTitle.textContent = title;

  header.appendChild(headerTitle);
  header.appendChild(
    /*컴포넌트 합성*/ createImageButton({ imageSource, onButtonClick })
  );

  return header;
};
