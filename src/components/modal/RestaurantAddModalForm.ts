import { CATEGORY_OPTIONS, DISTANCE_OPTIONS } from '../../constant/selectOptions';
import createDOMElement from '../../util/createDomElement';
import ActionButton from '../button/ActionButton';
import CTAButton from '../button/CTAButton';
import { InputBox } from '../InputBox';

function RestaurantAddModalForm() {
  return createDOMElement({
    tag: 'form',
    children: [
      InputBox.Root({
        label: InputBox.Label({ text: '카테고리', htmlFor: 'category', className: 'label-required' }),
        input: InputBox.Select({
          name: 'category',
          id: 'category',
          options: CATEGORY_OPTIONS,
          required: true,
        }),
      }),
      InputBox.Root({
        label: InputBox.Label({ text: '이름', htmlFor: 'name', className: 'label-required' }),
        input: InputBox.Input({ type: 'text', name: 'name', id: 'name', required: true }),
      }),
      InputBox.Root({
        label: InputBox.Label({ text: '거리(도보 이동 시간)', htmlFor: 'distance', className: 'label-required' }),
        input: InputBox.Select({
          name: 'distance',
          id: 'distance',
          options: DISTANCE_OPTIONS,
          required: true,
        }),
      }),
      InputBox.Root({
        label: InputBox.Label({ text: '설명', htmlFor: 'description' }),
        input: InputBox.TextArea({
          name: 'description',
          id: 'description',
          cols: 30,
          rows: 5,
        }),
        caption: InputBox.Caption({
          text: '메뉴 등 추가 정보를 입력해 주세요.',
        }),
      }),
      InputBox.Root({
        label: InputBox.Label({ text: '참고 링크', htmlFor: 'link' }),
        input: InputBox.Input({
          type: 'text',
          name: 'link',
          id: 'link',
        }),
        caption: InputBox.Caption({
          text: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
        }),
      }),
      createDOMElement({
        tag: 'div',
        class: 'button-container',
        children: [ActionButton({ text: '취소하기', type: 'button' }), CTAButton({ text: '추가하기', type: 'submit' })],
      }),
    ],
  });
}

export default RestaurantAddModalForm;
