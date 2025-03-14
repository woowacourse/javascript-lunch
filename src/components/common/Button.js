export function Button({ id, type, content, dataSet, styleType, buttonValue }) {
  const classList =
    styleType === "primary"
      ? "button button--primary text-caption"
      : "button button--secondary text-caption";
  function template() {
    return `
        <button 
          ${buttonValue ? `value="${buttonValue}"` : ""} 
          ${id ? `id="${id}"` : ""}
          ${id ? `name="${id}"` : ""}
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
