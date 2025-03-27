import { CATEGORY_OPTIONS, DISTANCE_OPTIONS } from "../constants/constants.ts";

const createForm = () => {
  const getCategoryOptions = () => {
    return `<option value="">선택해 주세요</option>
              ${CATEGORY_OPTIONS.map(
                (option) => `<option value="${option}">${option}</option>`
              ).join("")}
            `;
  };

  const getDistanceOptions = () => {
    return `<option value="">선택해 주세요</option>
              ${DISTANCE_OPTIONS.map(
                (option) => `<option value="${option}">${option}분 내</option>`
              ).join("")}
            `;
  };

  const html = `
  <form>
      <div class="form-item form-item--required">
        <label for="category" class="text-caption">카테고리</label>
        <select name="category" id="category" required>
         ${getCategoryOptions()}
        </select>
      </div>
  
      <div class="form-item form-item--required">
        <label for="name" class="text-caption">이름</label>
        <input type="text" name="name" id="name" required />
      </div>
  
      <div class="form-item form-item--required">
        <label for="distance" class="text-caption">거리(도보 이동 시간)</label>
        <select name="distance" id="distance" required>
         ${getDistanceOptions()}
        </select>
      </div>
  
      <div class="form-item">
        <label for="description" class="text-caption">설명</label>
        <textarea name="description" id="description" cols="30" rows="5"></textarea>
        <span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
      </div>
  
      <div class="form-item">
        <label for="link" class="text-caption">참고 링크</label>
        <input type="url" name="link" id="link" />
        <span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span>
      </div>
      </form>
  `;

  return html;
};

export { createForm };
