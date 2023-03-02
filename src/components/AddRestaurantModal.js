import GLOBAL_CSS from '../constants';

class AddRestaurantModal extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const globalStyle = document.createElement('style');
    const componentStyle = document.createElement('style');
    globalStyle.textContent = GLOBAL_CSS;
    componentStyle.textContent = `
    .modal {
        display: none;
      }
      
      .modal--open {
        display: block;
      }
      
      .modal-backdrop {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        background: rgba(0, 0, 0, 0.35);
      }
      
      .modal-container {
        position: fixed;
        width: 100%;
        bottom: 0;
        max-width: 360px;
        padding: 32px 16px;
        border-radius: 8px 8px 0px 0px;
        background: var(--grey-100);
      }
      
      .modal-title {
        margin-bottom: 36px;
      }

      .button-container {
        display: flex;
      }
`;

    const template = document.createElement('template');

    template.innerHTML = `
    <div class="modal modal--open">
    <div class="modal-backdrop"></div>
    <div class="modal-container">
      <h2 class="modal-title text-title">새로운 음식점</h2>
      <form>
      <add-category-list
      name="카테고리"
      id="category"
      options="한식,중식,일식,양식,아시안,기타"
    ></add-category-list>
    <add-text-input name="이름" id="name" ></add-text-input>
    <add-category-list
    name="거리(도보 이동 시간)"
    id="distance"
    options="5,10,15,20,30"
    ></add-category-list>
    <add-text-input name="설명" id="description" caption="메뉴 등 추가 정보를 입력해 주세요." ></add-text-input>
    <add-text-input name="참고 링크" id="link" caption="매장 정보를 확인할 수 있는 링크를 입력해 주세요." ></add-text-input>
        <div class="button-container">
        <lunch-button name="취소하기" color="white"></lunch-button>
        <lunch-button name="추가하기" color="orange"></lunch-button>
          </div>
      </form>
    </div>
  </div>
    `;

    const cloneNode = template.content.cloneNode(true);

    this.shadowRoot.appendChild(globalStyle);
    this.shadowRoot.appendChild(componentStyle);
    this.shadowRoot.appendChild(cloneNode);
  }
}

export default AddRestaurantModal;
