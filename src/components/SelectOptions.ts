import { Option } from '../types/types';

function createSelectOptions(option: Option) {
  return option.text
    .map((optionText, index) => `<option value="${option.value[index]}">${optionText}</option>`)
    .join('');
}

export default createSelectOptions;
