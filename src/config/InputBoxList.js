import InputBox from '../components/common/InputBox.js';
import Select from '../components/Select.js';
import {
  INPUT_FIELDS,
  INPUT_LABELS,
  INPUT_CAPTIONS,
  CATEGORY_OPTIONS,
  DISTANCE_OPTIONS,
} from '../constants/constants.js';

export const inputBoxList = [
  new InputBox({
    input: new Select({
      name: INPUT_FIELDS.CATEGORY,
      optionList: CATEGORY_OPTIONS,
    }).template(),
    section: INPUT_FIELDS.CATEGORY,
    label: INPUT_LABELS.CATEGORY,
    isRequired: true,
  }),
  new InputBox({
    input: `<input type="text" name="${INPUT_FIELDS.NAME}" id="${INPUT_FIELDS.NAME}" maxlength="20" required />`,
    section: INPUT_FIELDS.NAME,
    label: INPUT_LABELS.NAME,
    isRequired: true,
  }),
  new InputBox({
    input: new Select({
      name: INPUT_FIELDS.DISTANCE,
      optionList: DISTANCE_OPTIONS,
    }).template(),
    section: INPUT_FIELDS.DISTANCE,
    label: INPUT_LABELS.DISTANCE,
    isRequired: true,
  }),
  new InputBox({
    input: `<textarea maxlength="1000" name="${INPUT_FIELDS.DESCRIPTION}" id="${INPUT_FIELDS.DESCRIPTION}" cols="30" rows="5"></textarea>`,
    section: INPUT_FIELDS.DESCRIPTION,
    label: INPUT_LABELS.DESCRIPTION,
    caption: INPUT_CAPTIONS.DESCRIPTION,
    isRequired: false,
  }),
  new InputBox({
    input: `<input type="url" name="${INPUT_FIELDS.LINK}" id="${INPUT_FIELDS.LINK}" />`,
    section: INPUT_FIELDS.LINK,
    label: INPUT_LABELS.LINK,
    caption: INPUT_CAPTIONS.LINK,
    isRequired: false,
  }),
];
