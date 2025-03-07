const dropDown = (props) => {
  const { id, isRequired, labelText, options } = props;

  const required = isRequired ? "required" : "";

  return `
    <label for=${id} text-caption">${labelText}</label>
    <select name=${id} id=${id} ${required}>
     ${options.map((option) => {
       return `<option value=${option.value}>${option.text}</option>`;
     })}
    </select>
    `;
};

export default dropDown;
