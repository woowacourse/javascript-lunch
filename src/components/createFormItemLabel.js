export const createFormItemLabel = (type, title) => {
  const label = document.createElement('label');
  label.setAttribute('for', type);
  label.classList.add('text-caption');
  label.textContent = title;

  return label;
};
