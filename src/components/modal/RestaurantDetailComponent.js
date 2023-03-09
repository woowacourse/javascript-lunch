import CustomElement from "../../abstracts/CustomElement";

class RestaurantDetailComponent extends CustomElement {
  setEvent() {
    document.getElementById("close").addEventListener("click", this.hideModal);
  }

  hideModal() {
    document.getElementById("detail_modal").classList.remove("modal--open");
  }

  template() {
    return `
    <div class="detail__name">
      <img
        src="./favorite-icon-lined.png"             
        alt="한식"
        class="detail__icon"
      />
      <img src="./favorite-icon-lined.png" alt="즐겨찾기" class="restaurant_star star" />
    </div>
    <div class="detail">
    <div class="detail__info">
      <h3 class="text-title">집가고싶당히잉</h3>
      <span class="detail__distance text-body">캠퍼스부터 15분 이내</span>
      <p class="detail__description text-body">
        지은이의 집은 선릉역에서 20분이면 안방까지 도착하는 가까운 거리입니다. 근데 왜 아직도 이러고 있는 걸까요? 글쎄요 저도 궁금한데요 저는 언제 집갈 수 있죠? 아 쉬발 모달을 구현해봤자 뭐합니까 연결하느라 세시간은 더 거릴텐데 그냥 대가리가 깨져버리고 있어요 어디까지 쓸 수 있는지 테스트 중입니다. 씨이ㅣ이이발지은이의 집은 선릉역에서 20분이면 안방까지 도착하는 가까운 거리입니다. 근데 왜 아직도 이러고 있는 걸까요? 글쎄요 저도 궁금한데요 저는 언제 집갈 수 있죠? 아 쉬발 모달을 구현해봤자 뭐합니까 연결하느라 세시간은 더 거릴텐데 그냥 대가리가 깨져버리고 있어요 어디까지 쓸 수 있는지 테스트 중입니다. 씨이ㅣ이이발s
      </p>
      <a href="http://localhost:8080/" class="detail__link text-body"> http://localhost:8080/ </a>
      <div class="button-container">
        <button-element btnType="button" btnClass="button--secondary" btnText="삭제하기"></button-element>
        <button-element id="close" btnType="button" btnClass="button--primary" btnText="닫기"></button-element>
      </div>
    </div>
  </div>
    `;
  }
}

customElements.define("restaurant-detail", RestaurantDetailComponent);

export default RestaurantDetailComponent;
