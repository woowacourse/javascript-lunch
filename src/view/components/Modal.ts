import { EventCallback, useEvents } from '../../utils/core';
import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
import { useRestaurants } from '../../utils/hooks/useRestaurants';
import { getFormFields } from '../../utils/common/formData';
import { useForm } from '../../utils/hooks/useForm';
import Validator from '../../validation';
import { META_CATEGORY, META_DISTANCE } from '../../constants/restaurants';
import { Button } from './Button';

interface ModalProps {
  close: VoidFunction;
}

function Modal({ close }: ModalProps) {
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

      const isSuccess = handleClickAddBtn({
        ...fields,
        distance: Number(fields.distance),
      } as Omit<RestaurantInfo, 'id'>);

      isSuccess && closeModal();
    }
  };

  addEvent('click', '.modal-backdrop', closeModal);

  addEvent('submit', 'form', handleSubmit(onSubmit));

  return `
    <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            <h2 class="modal-title text-title">새로운 음식점</h2>
            <form>
                <!-- 카테고리 -->
                <div class="form-item form-item--required">
                    <label for="category text-caption">
                      <span class="form-label-text--required">카테고리</span>
                      <span class="form-label-error">${errors['category'] ?? ''}</span>
                    </label>
                    <select name="category" id="category" required>
                    <option value="">선택해 주세요</option>/option>
                    ${Object.values(META_CATEGORY).map(
                      (value) => `<option value=${value}
                      ${
                        value === register('category', Validator.Restaurant.checkCategory)
                          ? 'selected'
                          : ''
                      }
                      >${value}</option>`
                    )}
                    </select>
                </div>

                <!-- 음식점 이름 -->
                <div class="form-item form-item--required">
                    <label for="name text-caption">
                      <span class="form-label-text--required">이름</span>
                      <span class="form-label-error">${errors['name'] ?? ''}</span>
                    </label>
                    <input type="text" name="name" id="name" required
                    value=${register('name', Validator.Restaurant.checkName)}>
                </div>

                <!-- 거리 -->
                <div class="form-item form-item--required">
                    <label for="distance text-caption">
                      <span class="form-label-text--required">거리(도보 이동 시간) </span>
                      <span class="form-label-error">${errors['distance'] ?? ''}</span>
                    </label>
                    <select name="distance" id="distance" >
                        <option value="">선택해 주세요</option>
                        ${Object.entries(META_DISTANCE).map(
                          ([key, value]) => `<option value=${key}
                          ${
                            key === register('distance', Validator.Restaurant.checkDistance)
                              ? 'selected'
                              : ''
                          }
                          >${value}</option>`
                        )}
                    </select>
                </div>

                <!-- 설명 -->
                <div class="form-item">
                <label for="description text-caption">설명</label>
                <textarea name="description" id="description" cols="30" rows="5"></textarea>
                <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
                </div>

                <!-- 링크 -->
                <div class="form-item">
                    <label for="link text-caption">참고 링크</label>
                    <input type="text" name="link" id="link">
                    <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
                </div>

                <!-- 취소/추가 버튼 -->
                <div class="button-container">
                    ${Button({
                      children: '취소하기',
                      attribute: {
                        type: 'reset',
                        class: 'button button--secondary text-caption',
                      },
                      onClick: closeModal,
                    })}
                    ${Button({
                      children: '추가하기',
                      attribute: {
                        class: 'button button--primary text-caption',
                      },
                    })}
                </div>
            </form>
        </div>
    </div>
    `;
}
export { Modal };
