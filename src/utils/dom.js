export const $ = (selector) => {
  if (!document.getElementById(selector)) {
    console.log(`${selector}가 존재하지 않습니다!`);
  }

  return document.getElementById(selector);
};
