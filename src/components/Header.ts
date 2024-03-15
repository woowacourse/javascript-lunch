import Component from "../common/Component";

export default class Header extends Component {
  render() {
    return /*html*/ `    
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        <button type="button" class="gnb__button" aria-label="음식점 추가">
          <img src="./add-button.png" alt="음식점 추가" />
        </button>
    `;
  }
}
