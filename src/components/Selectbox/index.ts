import { SelectBoxConfig } from '../../types';

const Selectbox = {
  render(targetElement: Element, insertPosition: InsertPosition, selectboxConfig: SelectBoxConfig) {
    const template = this.getTemplate(selectboxConfig);

    targetElement.insertAdjacentHTML(insertPosition, template);
  },

  getTemplate(selectboxConfig: SelectBoxConfig) {
    const { attribute, firstOption, options, optionText } = selectboxConfig;

    return `
    <select 
    name=${attribute.name} 
    id=${attribute.id}
    ${attribute.class ? `class=${attribute.class}` : ''}
    ${attribute.isRequired ? 'required' : ''}>
      <option value=${firstOption.value}>${firstOption.text}</option>
      ${options.reduce((html, option) => {
        return html + `<option value="${option}">${option}${optionText}</option>`;
      }, '')} 
    </select>
    `;
  },
};

export default Selectbox;
