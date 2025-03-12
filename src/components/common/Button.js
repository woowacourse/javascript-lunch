export function Button({ id, type, content, dataSet, styleType }) {
  const classList =
    styleType === "primary"
      ? "button button--primary text-caption"
      : "button button--secondary text-caption";

  function template() {
    return `
        <button 
          ${id ? `id="${id}"` : ""} 
          type="${type}" 
          class="${classList}"
          ${dataSet ? `data-action="${dataSet}"` : ""}
        >
          ${content}
        </button>
    `;
  }

  return template();
}
