import '../css/AddFormModal.css';

import { useEvents } from '../../utils/core';
import { getFormFields } from '../../utils/common/formData';
import validator from '../../validation/validator';

import { RestaurantInfo } from '../../domain/model/LunchRecommendation';
interface AddFormModalProps {
  close: VoidFunction;
  handleClickAddBtn: (restaurantInfo: RestaurantInfo) => void;
}

function AddFormModal({ close, handleClickAddBtn }: AddFormModalProps) {
  const [addEvent] = useEvents('.modal');

  addEvent('click', '.modal-backdrop', (e) => {
    close();
  });

  addEvent('click', '#cancel', (e) => {
    close();
  });

  addEvent('submit', 'form', (e) => {
    if (e.target instanceof HTMLFormElement) {
      e.preventDefault();
      const fields = getFormFields(e.target);

      try {
        validator.checkName(fields.name);
        if (fields.description) validator.checkDescription(fields.description);
        if (fields.link) validator.checkLinkFormat(fields.link);

        handleClickAddBtn({
          ...fields,
          distance: Number(fields.distance),
        } as unknown as RestaurantInfo);

        close();
      } catch (err) {
        alert(err);
      }
    }
  });

  return `
    <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
            <h2 class="modal-title text-title">새로운 음식점</h2>
            <form>
                <!-- 카테고리 -->
                <div class="form-item form-item--required">
                    <label for="category text-caption">카테고리</label>
                    <select name="category" id="category" required>
                        <option value="">선택해 주세요</option>/option>
                        <option value="양식">양식
                        <option value="한식">한식</option>
                        <option value="중식">중식</option>
                        <option value="일식">일식</option>
                        <option value="아시안">아시안</option>
                        <option value="기타">기타</option>
                    </select>
                </div>

                <!-- 음식점 이름 -->
                <div class="form-item form-item--required">
                    <label for="name text-caption">이름</label>
                    <input type="text" name="name" id="name" placeholder="20자 이내로 공백 없이 입력해주세요" required>
                </div>

                <!-- 거리 -->
                <div class="form-item form-item--required">
                    <label for="distance text-caption">거리(도보 이동 시간) </label>
                    <select name="distance" id="distance" required>
                        <option value="">선택해 주세요</option>
                        <option value="5">5분 내</option>
                        <option value="10">10분 내</option>
                        <option value="15">15분 내</option>
                        <option value="20">20분 내</option>
                        <option value="30">30분 내</option>
                    </select>
                </div>

                <!-- 설명 -->
                <div class="form-item">
                <label for="description text-caption">설명</label>
                <textarea name="description" id="description" cols="30" rows="5" placeholder="300자 이내로 입력해주세요"></textarea>
                <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
                </div>

                <!-- 링크 -->
                <div class="form-item">
                    <label for="link text-caption">참고 링크</label>
                    <input type="text" name="link" id="link" placeholder="https://">
                    <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
                </div>

                <!-- 취소/추가 버튼 -->
                <div class="button-container">
                    <button type="reset" class="button button--secondary text-caption" id="cancel">취소하기</button>
                    <button type="submit" class="button button--primary text-caption">추가하기</button>
                </div>
            </form>
        </div>
    </div>
    `;
}
export { AddFormModal };
