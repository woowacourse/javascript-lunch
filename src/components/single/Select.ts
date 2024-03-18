import setAttributes from '../../utils/setAttributes';
import { createOptionArray } from '../unit/OptionArray';

interface Props {
  select?: {
    id?: string;
    name?: string;
    class?: string;
  };
  optionData: Record<string, string>;
}

export const createSelect = ({ select, optionData }: Props): HTMLElement => {
  /* select */
  const $select = document.createElement('select');
  setAttributes($select, select);

  /* option */
  const $optionArray = createOptionArray({ optionData: optionData });

  /* 컴포넌트 조립 */
  $select.append(...$optionArray);

  return $select;
};
