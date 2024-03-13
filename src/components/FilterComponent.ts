export default class FilterComponent {
  getTemplate = (options: object) => {
    const template = document.createElement('template');
    template.innerHTML = /*html*/ `
        <section class="restaurant-filter-container">
          <select name="category" id="category-filter" class="restaurant-filter">
            ${this.generateOption(options)}
          </select>
        </section>
      `;
    const node = template.content.cloneNode(true) as DocumentFragment;

    return node;
  };

  generateOption = (options: object) => {
    return Object.values(options)
      .map((category) => `<option value="${category}">${category}</option>`)
      .join('');
  };
}
