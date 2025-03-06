import { CATEGORY_OPTIONS, DISTANCE_OPTIONS } from "../constants/options.js";
import CustomDropdown from "../shared/CustomDropdown.js";
import CustomInput from "../shared/CustomInput.js";
import CustomButton from "../shared/CustomButton.js";

export default function AddRestaurantModal(container) {
  container.innerHTML += `
        <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form>
            <!-- 카테고리 -->
             ${CustomDropdown({
               label: "카테고리",
               name: "category",
               id: "category",
               options: CATEGORY_OPTIONS,
               required: true,
             })}

            <!-- 음식점 이름 -->
             ${CustomInput({
               label: "이름",
               name: "name",
               id: "name",
               type: "text",
               required: true,
             })}
            
            <!-- 거리 -->
              ${CustomDropdown({
                label: "거리(도보 이동 시간)",
                name: "distance",
                id: "distance",
                options: DISTANCE_OPTIONS,
                required: true,
              })}
            
            <!-- 설명 -->
            <div class="form-item">
              <label for="description" class="text-caption">설명</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption">
                메뉴 등 추가 정보를 입력해 주세요.
              </span>
            </div>

            <!-- 링크 -->
             ${CustomInput({
               label: "참고 링크",
               name: "link",
               id: "link",
               type: "text",
             })}

            <!-- 취소/추가 버튼 -->
            <div class="button-container">
          ${CustomButton("close-modal", "button--secondary", "취소하기")}
          ${CustomButton("", "button--primary", "추가하기")}
            </div>
          </form>
        </div>
      </div>
  `;
}
