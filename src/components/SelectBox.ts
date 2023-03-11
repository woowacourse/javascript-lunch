export default class SelectBox {
  selection: { label: string; value: string }[];
  type: string;

  constructor(selection: { label: string; value: string }[], type = '') {
    this.selection = selection;
    this.type = type;
  }

  template(): string {
    return `
        <select name="${this.type}" id="${this.type}-filter" class="restaurant-filter">
          ${this.selection
            .map(
              (option: { label: string; value: string }) => `<option value="${option.label}">${option.value}</option>`
            )
            .join('')}
        </select>
    `;
  }
}
