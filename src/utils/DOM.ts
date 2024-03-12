function validateSelector(selector: string) {
  if (selector === '' || selector === undefined) {
    throw new Error('잘못된 셀렉터 값입니다.');
  }
}

const DOM = {
  $: (selector: string) => {
    try {
      validateSelector(selector);
      return document.querySelector(selector);
    } catch (error) {
      alert(error);
    }
  },
  $$: (selector: string) => {
    try {
      validateSelector(selector);
      return document.querySelectorAll(selector);
    } catch (error) {
      alert(error);
      return [];
    }
  },
};

export default DOM;
