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
      formData[key] = value;
      return formData;
    }, {});
  }

  #setLocalStorage(formData) {
    if (window.localStorage.getItem('restaurants')) {
      const restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
      restaurants.push(formData);
      window.localStorage.setItem('restaurants', JSON.stringify(restaurants));
    }
    window.localStorage.setItem('restaurants', JSON.stringify([formData]));
  }
}
