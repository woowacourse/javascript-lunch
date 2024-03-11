const Select = ({ id, name, options, classList, isRequired, label }) => {
  return `
    ${label ? `<label for=${name} class=${label.classList.join(' ')}>${label.content}</label>` : ''}
    <select id=${id} name=${name} class=${classList.join(' ')} required=${isRequired}>
    ${options.map(({ value, content }) => {
      return `<option value=${value}>${content}</option>`;
    })}
    </select>
  `;
};

export default Select;
