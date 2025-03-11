import Component from "../Component.js";

class Restaurant extends Component {
  constructor($target, props) {
    super($target, props);
  }

  template() {
    const { name, distance, description, imgSrc, imgAlt } = this.props;
    return ` 
              <div class="restaurant__category">
                  <img
                    src=${imgSrc}
                    alt=${imgAlt}
                    class="category-icon"
                  />
                </div>
                <div class="restaurant__info">
                  <h3 class="restaurant__name text-subtitle">${name}</h3>
                  <span class="restaurant__distance text-body"
                    >캠퍼스부터 ${distance}분 내</span
                  >
                  <p class="restaurant__description text-body">
                  ${description}
                  </p>
                </div>
              

      `;
  }
}

export default Restaurant;
