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
      if (error instanceof Error) alert(error.message);
      return;
    }
  },
  $$: (selector: string) => {
    try {
      validateSelector(selector);
      return document.querySelectorAll(selector);
    } catch (error) {
      if (error instanceof Error) alert(error.message);
      return [];
    }
  },
};

export default DOM;
