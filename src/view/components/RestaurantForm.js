export const RESTAURANT_FORM_EVENTS = {
  submit: 'restaurantFormSubmit',
  reset: 'restaurantFormReset',
};

export default class RestaurantForm extends HTMLFormElement {
  #linkInput;

  constructor() {
    super();

    const template = document.querySelector('#template-restaurant-form');
    const content = template.content.cloneNode(true);
    this.appendChild(content);

    this.#linkInput = this.querySelector('#link');
  }

  connectedCallback() {
    this.addEventListener('submit', this.#handleSubmit.bind(this));
    this.addEventListener('reset', this.#handleReset.bind(this));

    this.#linkInput.addEventListener('invalid', () => {
      this.#linkInput.value = ""
      this.#linkInput.setCustomValidity('');
    })
  }

  // eslint-disable-next-line
  #handleSubmit(e) {
    e.preventDefault();

    if (!this.#checkLinkInputVaildity()) {
      this.#linkInput.setCustomValidity('유효하지 않은 링크입니다.')
      return;
    }

    const data = new FormData(e.target);
    const formData = this.#getFormDataObj(data);

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_FORM_EVENTS.submit, {
        bubbles: true,
        detail: { formData },
      }),
    );
      
    this.reset();
  }

  #handleReset() {
    this.dispatchEvent(
      new CustomEvent(RESTAURANT_FORM_EVENTS.reset, {
        bubbles: true,
      }),
    );
  }

  #checkLinkInputVaildity() {
    if(this.#linkInput.value === "") return true;
    
    const regex = new RegExp('^https?:\/\/');
    return regex.test(this.#linkInput.value);
  }

  /**
   * @param {FormData} data
   */
  #getFormDataObj(data) {
    return [...data.keys()].reduce((formData, key) => {
      const value = data.get(key);
      return {...formData, [key]: value};
    }, {});
  }
}
