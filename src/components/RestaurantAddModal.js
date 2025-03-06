import createDOMElement from '../util/createDomElement.js';
import { InputBox } from './InputBox.js';
import Modal from './Modal.js';

function RestaurantAddModal() {
  const content = createDOMElement({
    tag: 'div',
    class: 'modal-container',
    children: [
      createDOMElement({
        tag: 'h2',
        class: ['modal-title', 'text-title'],
        textContent: '새로운 음식점',
      }),
      createDOMElement({
        tag: 'form',
        children: [
          InputBox.Root({
            label: InputBox.Label({ text: '카테고리', for: 'category', className: 'label-required' }),
            input: InputBox.Select({
              name: 'category',
              id: 'category',
              options: [
                { value: '', option: '선택해 주세요' },
                { value: '한식', option: '한식' },
                { value: '중식', option: '중식' },
                { value: '일식', option: '일식' },
                { value: '양식', option: '양식' },
                { value: '아시안', option: '아시안' },
                { value: '기타', option: '기타' },
              ],
              required: true,
            }),
          }),
          InputBox.Root({
            label: InputBox.Label({ text: '이름', for: 'name', className: 'label-required' }),
            input: InputBox.Input({ type: 'text', name: 'name', id: 'name', required: true }),
          }),
          InputBox.Root({
            label: InputBox.Label({ text: '거리(도보 이동 시간)', for: 'distance', className: 'label-required' }),
            input: InputBox.Select({
              name: 'distance',
              id: 'distance',
              options: [
                { value: '', option: '선택해 주세요' },
                { value: '5', option: '5분 내' },
                { value: '10', option: '10분 내' },
                { value: '15', option: '15분 내' },
                { value: '20', option: '20분 내' },
                { value: '30', option: '30분 내' },
              ],
              required: true,
            }),
          }),
          InputBox.Root({
            label: InputBox.Label({ text: '설명', for: 'description' }),
            input: InputBox.TextArea({
              name: 'description',
              id: 'description',
              cols: '30',
              rows: '5',
            }),
            caption: InputBox.Caption({
              text: '메뉴 등 추가 정보를 입력해 주세요.',
            }),
          }),
          InputBox.Root({
            label: InputBox.Label({ text: '참고 링크' }),
            input: InputBox.Input({
              type: 'text',
              name: 'link',
              id: 'link',
            }),
            caption: InputBox.Caption({
              text: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
            }),
          }),
        ],
      }),
    ],
  });

  return Modal({ content });
}

export default RestaurantAddModal;
