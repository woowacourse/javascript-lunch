export default function CustomButton(id = "", className = "", text = "") {
  return `
    <button 
      ${id ? `id="${id}"` : ""}
      type="${id === "" ? "submit" : "button"}" 
      class="button ${className} text-caption"
    >
      ${text}
    </button>
  `;
}
