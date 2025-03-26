class Component {
  #element;
  #state;
  #props;
  #tagName;
  #className;

  constructor(props, parent, tagName = 'div', className = '') {
    this.#props = props;
    this.parent = parent;
    this.#state = {};
    this.#tagName = tagName;
    this.#className = className;

    this.setup();
    this.render();
  }

  setup() {}

  render() {
    if (!this.#element) {
      const templateElement = document.createElement('template');
      templateElement.innerHTML = this.template().trim();

      if (templateElement.content.childElementCount === 1) {
        this.#element = templateElement.content.firstElementChild;
      } else {
        const wrapper = document.createElement('section');
        wrapper.id = 'app-container';
        while (templateElement.content.firstChild) {
          wrapper.appendChild(templateElement.content.firstChild);
        }
        this.#element = wrapper;
      }

      if (this.#className) this.#element.classList.add(this.#className);
    } else {
      this.#element.innerHTML = this.template();
    }
    this.onRender();
  }

  setState(nextState) {
    this.#state = nextState;
    this.render();
  }

  template() {
    return ``;
  }

  onRender() {}

  get element() {
    return this.#element;
  }

  get props() {
    return this.#props;
  }

  get state() {
    return this.#state;
  }
}

export default Component;
