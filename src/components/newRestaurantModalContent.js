import {
  BUTTON_TEXT,
  CATEGORY_LIST,
  DISTANCE_LIST,
  HELP_TEXT,
  LABEL_TEXT,
  TITLE,
} from '../constants/newRestaurantModalContent';
import { $inBody } from '../utils/selector';

class NewRestaurantModalContent {
  render(selector) {
    $inBody(selector).insertAdjacentHTML('beforeend', this.#template());
  }

  #template() {
    return `
			<h2 class="modal-title text-title">${TITLE}</h2>
					<form id="new-restaurant-form">
						<!-- 카테고리 -->
						<div class="form-item form-item--required">
							<label for="category">${LABEL_TEXT.CATEGORY}</label>
							<select name="category" id="category" required>
								${CATEGORY_LIST.map(
                  category =>
                    `<option value="${category.value}">${category.text}</option>`
                ).join('')}
							</select>
						</div>

						<!-- 음식점 이름 -->
						<div class="form-item form-item--required">
							<label for="name">${LABEL_TEXT.NAME}</label>
							<input type="text" name="name" id="name" required />
							<span class="help-text text-caption">${HELP_TEXT.NAME}</span>
						</div>

						<!-- 거리 -->
						<div class="form-item form-item--required">
							<label for="distance">${LABEL_TEXT.DISTANCE}</label>
							<select name="distance" id="distance" required>
								${DISTANCE_LIST.map(
                  distance =>
                    `<option value="${distance.value}">${distance.text}</option>`
                )}
							</select>
						</div>

						<!-- 설명 -->
						<div class="form-item">
							<label for="description">${LABEL_TEXT.DESCRIPTION}</label>
							<textarea name="description" id="description" cols="30" rows="5"></textarea>
							<span class="help-text text-caption">${HELP_TEXT.DESCRIPTION}</span>
						</div>

						<!-- 링크 -->
						<div class="form-item">
							<label for="link">${LABEL_TEXT.LINK}</label>
							<input type="url" name="link" id="link" placeholder="https://example.com" />
							<span class="help-text text-caption">${HELP_TEXT.LINK}</span>
						</div>

						<!-- 취소/추가 버튼 -->
						<div class="button-container">
							<button type="button" class="button button--secondary text-caption" aria-label="cancel">
								${BUTTON_TEXT.CANCEL}
							</button>
							<button class="button button--primary text-caption" aria-label="register">
								${BUTTON_TEXT.ADDITION}
							</button>
						</div>
					</form>
		`;
  }
}

export default NewRestaurantModalContent;
