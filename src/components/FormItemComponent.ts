type Props = {
  labelText: string;
  label: string;
  children: DocumentFragment;
  isRequired?: boolean;
  description?: string;
};

export default function FormItemComponent({
  labelText,
  label,
  children,
  isRequired = true
}: Props) {
  const getTemplate = () => {
    const template = document.createElement('template');
    const childrenHTML = children.firstElementChild?.outerHTML || '';
    template.innerHTML = `
        <div class="form-item ${isRequired ? 'form-item--required' : ''}">
          <label for="${label}" class="text-caption">${labelText}</label>
          ${childrenHTML}
        </div>
      `;
    return template.content;
  };

  return { getTemplate };
}
