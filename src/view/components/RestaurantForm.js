export const RESTAURANT_FORM_EVENTS = {
  submit: 'restaurantFormSubmit',
  reset: 'restaurantFormReset',
};

export default class RestaurantForm extends HTMLFormElement {
  constructor() {
    super();

    const template = document.querySelector('#template-restaurant-form');
    const content = template.content.cloneNode(true);
    this.appendChild(content);
  }

  connectedCallback() {
    this.addEventListener('submit', this.#handleSubmit.bind(this));
    this.addEventListener('reset', this.#handleReset.bind(this));
  }

  // eslint-disable-next-line
  #handleSubmit(e) {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = this.#getFormDataObj(data);

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_FORM_EVENTS.submit, {
        bubbles: true,
        detail: { formData },
      }),
    );
  }

  #handleReset(e) {
    e.preventDefault();

    this.dispatchEvent(
      new CustomEvent(RESTAURANT_FORM_EVENTS.reset, {
        bubbles: true,
      }),
    );
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
