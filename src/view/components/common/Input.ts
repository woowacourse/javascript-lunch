import { Attribute, parseAttribute } from '../../../utils/common/domHelper';

interface InputProps {
  label?: string;
  caption?: string;
  error?: string;
  attribute: Attribute;
}

function Input(props: InputProps) {
  const { label, caption, attribute, error } = props;
  return `
    ${
      label
        ? `<label for="${attribute.id ?? ''} text-caption">
              <span class="form-label-text ${attribute.required ? 'required' : ''}">${label}</span>
              ${error ? `<span class="form-label-error">${error}</span>` : ''}
          </label>`
        : ''
    }
    <input ${attribute ? parseAttribute(attribute) : ''}>
    ${caption ? `<span class="help-text text-caption">${caption}</span>` : ''}
  `;
}

export { Input };
