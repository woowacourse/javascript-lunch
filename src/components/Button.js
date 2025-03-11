export function Button(id, type, content, dataSet, styleType) {
  const buttonType =
    styleType === "primary"
      ? {
          classList: "button button--primary text-caption",
        }
      : {
          classList: "button button--secondary text-caption",
          id: "closeModalBtn",
          dataAction: "removeModal",
        };

  function render() {
    return `
        <button 
          ${id ? `id="${id}"` : ""}
          type="${type}" 
          class="${buttonType}"
          ${dataAction ? `data-action="${dataAction}"` : ""}
        >
          ${content}
        </button>
    `;
  }
  render();
}
