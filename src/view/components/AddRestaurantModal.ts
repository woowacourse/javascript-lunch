import { EventCallback, useEvents } from '../../utils/core';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { getFormFields } from '../../utils/common/formData';
import { useForm } from '../../utils/hooks/useForm';
import Validator from '../../validation';
import { META_CATEGORY, META_DISTANCE } from '../../constants/restaurants';
import { Button } from './Button';
import { MetaSelect } from './MetaSelect';
import { parseDistance } from '../../utils/common/restaurant';
import { Input } from './common/Input';
import { Modal } from './Modal';

interface AddRestaurantModalProps {
  close: VoidFunction;
}

function AddRestaurantModal({ close }: AddRestaurantModalProps) {
  const {
    handlers: { handleClickAddBtn },
  } = useRestaurants();
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  const [addEvent] = useEvents('.modal');

  const closeModal = () => {
    reset();
    close();
  };

  const onSubmit: EventCallback = (e) => {
    if (e.target instanceof HTMLFormElement) {
      const fields = getFormFields(e.target);
      handleClickAddBtn({
        ...fields,
        distance: parseDistance(fields.distance as string),
      } as Omit<RestaurantInfo, 'id'>);

      closeModal();
    }
  };

  addEvent('submit', 'form', handleSubmit(onSubmit));

  return Modal({
    closeModal,
    children: `
    <h2 class="modal-title text-title">새로운 음식점</h2>
    <form>
        <!-- 카테고리 -->
        <div class="form-item form-item--required">
            ${MetaSelect({
              label: '카테고리',
              error: errors['category'],
              metaData: Object.values(META_CATEGORY),
              selected: register('category', Validator.Restaurant.checkCategory),
              attribute: {
                class: '',
                name: 'category',
                id: 'category',
                required: true,
              },
            })}
        </div>

        <!-- 음식점 이름 -->
        <div class="form-item form-item--required">
            ${Input({
              label: '이름',
              error: errors['name'],
              attribute: {
                id: 'name',
                name: 'name',
                type: 'text',
                value: register('name', Validator.Restaurant.checkName),
                required: true,
                class: '',
              },
            })}
        </div>

        <!-- 거리 -->
        <div class="form-item form-item--required">
            ${MetaSelect({
              label: '거리(도보 이동 시간)',
              error: errors['distance'],
              metaData: Object.values(META_DISTANCE),
              selected: register('distance', Validator.Restaurant.checkDistance),
              attribute: {
                class: '',
                name: 'distance',
                id: 'distance',
                required: true,
              },
            })}
        </div>

        <!-- 설명 -->
        <div class="form-item">
        <label for="description text-caption">설명</label>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
        <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
        </div>

        <!-- 링크 -->
        <div class="form-item">
            ${Input({
              label: '참고 링크',
              caption: '매장 정보를 확인할 수 있는 링크를 입력해 주세요.',
              attribute: {
                id: 'link',
                name: 'link',
                type: 'text',
                class: '',
              },
            })}
        </div>

        <!-- 취소/추가 버튼 -->
        <div class="button-container">
            ${Button({
              children: '취소하기',
              onClick: closeModal,
              attribute: {
                type: 'reset',
                class: 'button button--secondary text-caption',
              },
            })}
            ${Button({
              children: '추가하기',
              attribute: {
                class: 'button button--primary text-caption',
              },
            })}
        </div>
    </form>`,
  });
}
export { AddRestaurantModal };
