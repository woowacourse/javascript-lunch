export default class FormItem {
  constructor(private template: string, private isRequired: boolean) {
    this.template = template;
    this.isRequired = isRequired;
  }

  public getTemplate() {
    return `
        <div class="${'form-item'} ${this.isRequired ? 'form-item--required' : ''}">
            ${this.template}
        </div>
        `;
  }
}
