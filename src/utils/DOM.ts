function validateSelector(selector: string) {
  if (selector === '' || selector === undefined) {
    alert('잘못된 셀렉터 값입니다.');
    throw new Error('잘못된 셀렉터 값입니다.');
  }
}

function validateExistElement(element: Element | null) {
  if (element === null) {
    alert('element를 찾을 수 없습니다,');
    throw new Error('element를 찾을 수 없습니다');
  }
}

function validateExistElements(elements: NodeListOf<Element>) {
  if (elements.length === 0) {
    alert('element를 찾을 수 없습니다,');
    throw new Error('element를 찾을 수 없습니다');
  }
}

const DOM = {
  $: <T>(selector: string) => {
    validateSelector(selector);    
    const element = document.querySelector(selector);    
    
    validateExistElement(element);
    return element as T;
  },

  $$: <T extends Element>(selector: string) => {
    validateSelector(selector);
    const elements = document.querySelectorAll(selector);

    validateExistElements(elements);
    return elements as NodeListOf<T>;
  },
};

export default DOM;
