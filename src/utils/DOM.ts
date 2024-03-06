function validateSelector(selector: string) {
  if (selector === '' || selector === undefined) {
    alert('잘못된 셀렉터 값입니다.');
    throw new Error('잘못된 셀렉터 값입니다.');
  }
}

const DOM = {
  $: (selector: string) => {
    validateSelector(selector);
    return document.querySelector(selector);
  },
  $$: (selector: string) => {
    validateSelector(selector);
    return document.querySelectorAll(selector);
  },
};

export default DOM;
