import InputBox from '../components/InputBox.js';
import Select from '../components/Select.js';

export const inputBoxList = [
  new InputBox({
    input: new Select({
      name: 'category',
      optionList: ['한식', '중식', '일식', '양식', '아시안', '기타'],
    }).template(),
    section: 'category',
    label: '카테고리',
    isRequired: true,
  }),
  new InputBox({
    input: `<input type="text" name="name" id="name" maxlength='20' required />`,
    section: 'name',
    label: '이름',
    isRequired: true,
  }),
  new InputBox({
    input: new Select({
      name: 'distance',
      optionList: [5, 10, 15, 20, 30],
    }).template(),
    section: 'distance',
    label: '거리(도보 이동 시간)',
    isRequired: true,
  }),
  new InputBox({
    input: `<textarea maxlength='1000' name="description" id="description" cols="30" rows="5"></textarea>`,
    section: 'description',
    label: '설명',
    caption: '메뉴 등 추가 정보를 입력해 주세요.',
    isRequired: false,
  }),
  new InputBox({
    input: `<input type="url" name="link" id="link" />`,
    section: 'link',
    label: '참고 링크',
    caption: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
    isRequired: false,
  }),
];
