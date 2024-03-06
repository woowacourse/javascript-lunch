export default class Select {
  #data;

  constructor(data) {
    this.#data = data;
  }

  render() {
    const { id, name, options } = this.#data;
    const select = document.createElement('select');
    select.setAttribute('id', id);
    select.setAttribute('name', name);
    select.classList.add('restaurant-filter');

    Object.entries(options).forEach(([key, value]) => {
      const option = document.createElement('option');

      option.setAttribute('value', key);
      option.innerText = value;

      select.appendChild(option);
    });

    return select;
  }
}
