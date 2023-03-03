export default function selectTemplate({
  name,
  id,
  options,
  selected,
  required,
  className,
}) {
  return `
    <select name="${name}" id="${id}" class="${className}" ${
    required ? 'required' : ''
  }>
      ${options.reduce((html, { value, text }) => {
        return (
          html +
          `<option value="${value}"
           ${selected === value ? 'selected' : ''}
            >${text}</option>`
        );
      }, '')}
    </select>
  `;
}
