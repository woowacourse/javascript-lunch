import { ISelectOptionProps } from '../utils/util';

interface ISelectProps {
  name?: string;
  id?: string;
  options: ISelectOptionProps[];
  selected?: string;
  required?: boolean;
  className?: string;
}

export default function Select({
  name,
  id,
  options,
  selected,
  required,
  className,
}: ISelectProps) {
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
