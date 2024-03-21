import setAttributes from '../../utils/setAttributes';
import { OptionArray } from '../unit/OptionArray';

interface Props {
  select?: {
    id?: string;
    name?: string;
    class?: string;
  };
  optionData: Record<string, string>;
}

export const Select = ({ select, optionData }: Props): HTMLSelectElement => {
  /* select */
  const $select = document.createElement('select');
  setAttributes($select, select);

  /* option */
  const $optionArray = OptionArray({ optionData: optionData });

  /* 컴포넌트 조립 */
  $select.append(...$optionArray);

  return $select;
};
