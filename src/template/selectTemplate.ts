import { ISelectOptionProps } from '../utils/util';

interface IselectProps {
  name?: string;
  id?: string;
  options: ISelectOptionProps[];
  selected?: string;
  required?: string;
  className?: string;
}

export default function selectTemplate({
  name,
  id,
  options,
  selected,
  required,
  className,
}: IselectProps) {
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
