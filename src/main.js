import $header from "./components/header";

addEventListener('load', () => {
  const body = document.body;
  const HEADER_INFO = Object.freeze({
    TITLE : '점심 뭐 먹지',        
    BUTTON_TITLE : '음식점 추가',
    BUTTON_IMAGE : '../images/add-button.png'
  });
  body.prepend($header(HEADER_INFO));
});