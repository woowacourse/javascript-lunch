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
        <h3 class="restaurant__name text-subtitle">${this.props.name}</h3>
        <span class="restaurant__distance text-body"
          >캠퍼스로부터 ${this.props.distance}분 내</span
        >
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
