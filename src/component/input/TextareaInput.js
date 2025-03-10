export function TextareaInput({ isRequired = false, label, caption, name }) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  container.innerHTML = `
                <label for=${name} text-caption">설명</label>
              <textarea
                name=${name}
                id=${name}
                cols="30"
                rows="5"
              ></textarea>
              <span class="help-text text-caption"
                >메뉴 등 추가 정보를 입력해 주세요.</span
              >
  `;
  return container;
}
