type TextInputType = {
  setInnerHtml: (selector: string, items: string[]) => void;
};

const textInput: TextInputType = {
  setInnerHtml(selector: string, items: string[]) {
    if (this instanceof HTMLElement) {
      const options = this.querySelector(selector) as HTMLElement;
      options.innerHTML = items.join('');
    }
  },
};

export default textInput;
