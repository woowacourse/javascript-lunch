export function TextareaInput({
  isRequired = false,
  label,
  caption,
  isError = false,
}) {
  const container = document.createElement("div");
  container.classList.add("form-item");
  if (isRequired) {
    container.classList.add("form-item--required");
  }

  container.innerHTML = `
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
  `;
  return container;
}
