export const $ = (selector) => {
  if (!document.getElementById(selector)) {
    throw new Error('입력한 셀렉터가 존재하지 않습니다.');
  }

  return document.getElementById(selector);
};
