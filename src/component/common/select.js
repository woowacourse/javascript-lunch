const select = ({ id, name, required, options }) => {
  return `
    <select id="${id}" name="${name}" class="restaurant-filter" ${required ? 'required' : ''}>
      ${options
        .map(({ value, content }) => `<option value="${value}">${content}</option>`)
        .join('')}
    </select>
  `;
};

export default select;
