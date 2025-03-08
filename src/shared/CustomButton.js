export default function CustomButton({
  id = "",
  type = "",
  className = "",
  text = "",
}) {
  return `
    <button 
      ${id && `id="${id}"`}
      type="${type}" 
      class="button ${className} text-caption"
    >
      ${text}
    </button>
  `;
}
