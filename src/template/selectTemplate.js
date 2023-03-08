export default function selectTemplate({ name, id, options, required, className }) {
  return `
    <select name="${name}" id="${id}" class="${className}" ${required ? 'required' : ''}>
      ${options.reduce((html, { value, text }) => {
        return html + `<option value="${value}">${text}</option>`;
      }, '')}
    </select>
  `;
}
