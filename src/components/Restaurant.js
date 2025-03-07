import Component from "../core/Component";

class Restaurant extends Component {
  constructor(props) {
    super(props);
  }

  template() {
    return `  <li class="restaurant">
    <div class="restaurant__category">
      <img
        src="./public/images/category-korean.png"
        alt=${this.props.category}
        class="category-icon"
      />
    </div>
    <div class="restaurant__info">
      <h3 class="restaurant__name text-subtitle">${this.props.name}</h3>
      <span class="restaurant__distance text-body"
        >${this.props.distance}</span
      >
      <p class="restaurant__description text-body">
        ${this.props.description}
      </p>
    </div>
  </li>`;
  }
}

export default Restaurant;
