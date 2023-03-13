export default class SelectBox {
  private _selection: { label: string; value: string }[];
  private _type: string;

  constructor(selection: { label: string; value: string }[], type = '') {
    this._selection = selection;
    this._type = type;
  }

  template(): string {
    return `
        <select name="${this._type}" id="${this._type}-filter" class="restaurant-filter">
          ${this._selection
            .map(
              (option: { label: string; value: string }) => `<option value="${option.label}">${option.value}</option>`
            )
            .join('')}
        </select>
    `;
  }
}
