import Select from './Select';
import Button from './@common/Button';
import { CATEGORIES, DISTANCE_OPTIONS } from '../constants/options';
import EventManager from '../utils/@common/EventManager';
import { $ } from '../utils/@common/domHelper';
import useRestaurantForm from '../hooks/useRestaurantForm';

interface RestaurantFormProps {
  closeModal: () => void;
}

function RestaurantForm(props: RestaurantFormProps) {
  const { closeModal } = props;
  const eventManager = new EventManager($('#app'));
  const { addRestaurant } = useRestaurantForm();

  eventManager.addEvent('submit', 'form', (e: Event) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    addRestaurant(formData);

    closeModal();
    window.location.reload();
  });
  return `
    <form>
      <div class="form-item form-item--required">
        <label for="category" class="text-caption">카테고리</label>
        ${Select({
          attribute: {
            id: 'category',
            class: 'category-select',
            name: 'category',
            required: true,
          },
          children: Select.Option({
            options: [{ value: '', label: '선택해 주세요' }, ...CATEGORIES],
            selectedValue: '',
          }),
        })}
      </div>

      <div class="form-item form-item--required">
        <label for="name" class="text-caption">이름</label>
        <input type="text" name="name" id="name" required />
      </div>

      <div class="form-item form-item--required">
        <label for="distance" class="text-caption">거리(도보 이동 시간)</label>
        ${Select({
          attribute: {
            id: 'distance',
            class: 'distance-select',
            name: 'distance',
            required: true,
          },
          children: Select.Option({
            options: [
              { value: '', label: '선택해 주세요' },
              ...DISTANCE_OPTIONS,
            ],
            selectedValue: '',
          }),
        })}
      </div>

      <div class="form-item">
        <label for="description" class="text-caption">설명</label>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
        <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
      </div>

      <div class="form-item">
        <label for="link" class="text-caption">참고 링크</label>
        <input type="text" name="link" id="link" />
        <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
      </div>

      <div class="button-container">
        ${Button({
          children: '취소하기',
          attribute: {
            type: 'button',
            class: 'button button--secondary text-caption',
            id: 'cancel-button',
          },
        })}
        ${Button({
          children: '추가하기',
          attribute: {
            type: 'submit',
            class: 'button button--primary text-caption',
          },
        })}
      </div>
    </form>
  `;
}

export default RestaurantForm;
