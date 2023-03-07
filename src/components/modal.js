import { $inBody } from '../util/selector';

class Modal {
  render() {
    $inBody('.restaurant-add-modal').insertAdjacentHTML(
      'beforeend',
      this.template()
    );
  }

  template() {
    return `
			<div class="modal">
				<div class="modal-backdrop"></div>
				<div class="modal-container">
					<h2 class="modal-title text-title">새로운 음식점</h2>
					<form id="new-restaurant-form">
						<!-- 카테고리 -->
						<div class="form-item form-item--required">
							<label for="category">카테고리</label>
							<select name="category" id="category" required>
								<option value="">선택해 주세요</option>
								<option value="한식">한식</option>
								<option value="중식">중식</option>
								<option value="일식">일식</option>
								<option value="양식">양식</option>
								<option value="아시안">아시안</option>
								<option value="기타">기타</option>
							</select>
						</div>

						<!-- 음식점 이름 -->
						<div class="form-item form-item--required">
							<label for="name">이름</label>
							<input type="text" name="name" id="name" required />
							<span class="help-text text-caption">1~15자 사이의 이름을 입력해 주세요.</span>
						</div>

						<!-- 거리 -->
						<div class="form-item form-item--required">
							<label for="distance">거리(도보 이동 시간) </label>
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
							<label for="description">설명</label>
							<textarea name="description" id="description" cols="30" rows="5"></textarea>
							<span class="help-text text-caption">메뉴 등 추가 정보를 입력해 주세요.</span>
						</div>

						<!-- 링크 -->
						<div class="form-item">
							<label for="link">참고 링크</label>
							<input type="url" name="link" id="link" placeholder="https://example.com" />
							<span class="help-text text-caption">매장 정보를 확인할 수 있는 링크를 https:// 형식으로 입력해 주세요.</span>
						</div>

						<!-- 취소/추가 버튼 -->
						<div class="button-container">
							<button type="button" class="button button--secondary text-caption" aria-label="cancel">
								취소하기
							</button>
							<button class="button button--primary text-caption" aria-label="register">
								추가하기
							</button>
						</div>
					</form>
				</div>
			</div>
		`;
  }
}

export default Modal;
