import { FORM_OPTIONS } from '../../constants/addRestForm';
import DialogController from '../../controllers/DialogController';
import { Global } from '../../controllers/Global';
import RestDataAPI from '../../services/RestDataAPI';
import { KeyOfCategory, KeyOfDistance, Restaurant } from '../../types/restaurant';
import { $ } from '../../utils/dom';
import { createButton } from '../single/Button';
import { createH2 } from '../single/H2';
import { createInput } from '../single/Input';
import { createSelect } from '../single/Select';
import { createTextarea } from '../single/Textarea';
import { createFormItem } from '../unit/FormItem';

export const createAddRestDialog = (): HTMLDialogElement => {
  const $dialog = document.createElement('dialog');
  $dialog.id = 'add-rest-dialog';

  const $container = document.createElement('div');
  $container.classList.add('modal-container');

  const $buttonContainer = document.createElement('div');
  $buttonContainer.classList.add('button-container');

  /* 타이틀 */
  const $title = createH2({ h2: { class: 'modal-title text-title' }, text: '새로운 음식점' });

  /* Form */
  const $form = document.createElement('form');

  /* 카테고리 */
  const $category = createFormItem({
    label: { text: '카테고리', for: 'category', class: 'text-caption' },
    element: createSelect({ select: { id: 'category' }, optionData: FORM_OPTIONS.category }),
    required: true
  });

  /* 이름 */
  const $name = createFormItem({
    label: { text: '이름', for: 'name', class: 'text-caption' },
    element: createInput({ input: { id: 'name', type: 'text' } }),
    required: true
  });

  /* 거리 */
  const $distance = createFormItem({
    label: { text: '거리(도보 이동 시간)', for: 'distance', class: 'text-caption' },
    element: createSelect({ select: { id: 'distance' }, optionData: FORM_OPTIONS.distance }),
    required: true
  });

  /* 설명 */
  const $description = createFormItem({
    label: { text: '설명', for: 'description', class: 'text-caption' },
    element: createTextarea({ textarea: { id: 'description', cols: '30', rows: '5' } }),
    description: '메뉴 등 추가 정보를 입력해 주세요.'
  });

  /* 참고 링크 */
  const $link = createFormItem({
    label: { text: '참고 링크', for: 'link', class: 'text-caption' },
    element: createInput({ input: { id: 'link', type: 'text' } }),
    description: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.'
  });

  /* 취소 버튼 */
  const $cancel = createButton({
    button: { class: 'button button--secondary text-caption', type: 'button', onclick: resetAddRestForm },
    text: '취소하기'
  });

  /* 추가 버튼 */
  const $submit = createButton({
    button: { class: 'button button--primary text-caption', type: 'button', onclick: submitAddRestForm },
    text: '추가하기'
  });

  /* 컴포넌트 조립 */
  $buttonContainer.appendChild($cancel);
  $buttonContainer.appendChild($submit);
  $form.appendChild($category);
  $form.appendChild($name);
  $form.appendChild($distance);
  $form.appendChild($description);
  $form.appendChild($link);
  $form.appendChild($buttonContainer);
  $container.appendChild($title);
  $container.appendChild($form);
  $dialog.appendChild($container);

  return $dialog;
};

/* 바인딩을 위해 함수 선언문 사용 */
function submitAddRestForm() {
  const restaurant = {
    category: ($('#category') as HTMLSelectElement).value as KeyOfCategory,
    name: ($('#name') as HTMLInputElement).value,
    distance: ($('#distance') as HTMLSelectElement).value as KeyOfDistance,
    description: ($('#description') as HTMLTextAreaElement).value,
    link: ($('#link') as HTMLInputElement).value
  };

  RestDataAPI.save(restaurant);

  resetAddRestForm();
}

function resetAddRestForm() {
  $<HTMLFormElement>('#add-rest-dialog form').reset();
  Global.addRestDialogController?.closeDialog();
}
