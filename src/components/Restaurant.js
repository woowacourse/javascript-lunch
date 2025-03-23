import Component from '../core/Component.js';
import Modal from './Modal.js';

class Restaurant extends Component {
  constructor(props, parent) {
    super(props, parent, 'li', 'restaurant');
  }

  template() {
    return ` 
      <div class="restaurant__category">
        <img
          src="./public/images/${this.props.imgUrl}"
          alt=${this.props.category}
          class="category-icon"
        />
      </div>
      <div class="restaurant__info">
        <div class="restaurant__info--header">
          <div>
            <h3 class="restausrant__name text-subtitle">${this.props.name}</h3>
            <span class="restaurant__distance text-body"
              >캠퍼스로부터 ${this.props.distance}분 내</span
            >
          </div>
          <img class="restaurant__favorite" src="/images/favorite-icon-${
            this.props.favorite ? 'filled' : 'lined'
          }.png" alt="favorite" />
        </div>
        <div>
        <p class="restaurant__description text-body">
          ${this.props.description}
        </p>
      </div>
  `;
  }

  onRender() {
    this.element.dataset.id = this.props.id;
  }
}

export default Restaurant;
