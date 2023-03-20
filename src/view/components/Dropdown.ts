import { Attribute } from '../../utils/common/domHelper';
import { Select } from './common/Select';

interface DropdownProps {
  attribute: Attribute;
  selected: string;
  metaData: string[];
  label?: string;
  error?: string;
}

function Dropdown(props: DropdownProps) {
  const { attribute, selected, metaData, label, error } = props;
  return `
    <label for=${attribute.id}>
      ${label ? `<span class="form-label-text--required">${label}</span>` : ''}
      ${error ? `<span class="form-label-error">${error}</span>` : ''}
    </label>
    ${Select({
      attribute,
      children: `
        ${Select.Option({ children: '선택해 주세요' })}
        ${metaData.map((value) =>
          Select.Option({
            attribute: {
              class: '',
              value,
              selected: value === selected,
            },
            children: value,
          })
        )}
      `,
    })}
  `;
}

export { Dropdown };
