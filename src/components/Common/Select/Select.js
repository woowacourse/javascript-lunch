const Select = ({ id, name, options, classList, isRequired, label }, selectedValue = '') => {
  return `
    ${label ? `<label for=${name} class=${label.classList.join(' ')}>${label.content}</label>` : ''}
    <select id=${id} name=${name} class="select ${classList.join(' ')}" ${isRequired ? 'required' : ''}>
    ${options.map(({ value, content }) => `<option ${selectedValue === value ? 'selected' : ''} value=${value}>${content}</option>`).join('')}
    </select>
  `;
};

export default Select;
