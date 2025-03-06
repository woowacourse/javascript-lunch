import Dropdown from "../shared/CustomDropdown.js";

export default function AddRestaurantModal(container) {
  const categoryOptions = [
    { value: "한식", text: "한식" },
    { value: "중식", text: "중식" },
    { value: "일식", text: "일식" },
    { value: "양식", text: "양식" },
    { value: "아시안", text: "아시안" },
    { value: "기타", text: "기타" },
  ];
  const distanceOptions = [
    { value: "5", text: "5분 내" },
    { value: "10", text: "10분 내" },
    { value: "15", text: "15분 내" },
    { value: "20", text: "20분 내" },
    { value: "30", text: "30분 내" },
  ];

  container.innerHTML += `
        <div class="modal modal--open">
        <div class="modal-backdrop"></div>
        <div class="modal-container">
          <h2 class="modal-title text-title">새로운 음식점</h2>
          <form>
            <!-- 카테고리 -->
             ${Dropdown({ label: "카테고리", name: "category", id: "category", options: categoryOptions, required: true })}

            <!-- 음식점 이름 -->
            <div class="form-item form-item--required">
              <label for="name text-caption">이름</label>
              <input type="text" name="name" id="name" required />
            </div>

            <!-- 거리 -->
              ${Dropdown({ label: "거리(도보 이동 시간)", name: "distance", id: "distance", options: distanceOptions, required: true })}
            <!-- 설명 -->
            <div class="form-item">
              <label for="description text-caption">설명</label>
              <textarea
                name="description"
                id="description"
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
            </div>

            <!-- 링크 -->
            <div class="form-item">
              <label for="link text-caption">참고 링크</label>
              <input type="text" name="link" id="link" />
              <span class="help-text text-caption"
                >매장 정보를 확인할 수 있는 링크를 입력해 주세요.</span
              >
            </div>

            <!-- 취소/추가 버튼 -->
            <div class="button-container">
              <button 
                id ="close-modal"
                type="button"
                class="button button--secondary text-caption"
              >
                취소하기
              </button>
              <button class="button button--primary text-caption">
                추가하기
              </button>
            </div>
          </form>
        </div>
      </div>
  `;
}
