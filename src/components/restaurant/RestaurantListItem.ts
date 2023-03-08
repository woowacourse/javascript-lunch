import Component from '../Component';

class RestaurantListItem extends Component {
  override renderTemplate() {
    return `
      <style>
        li {
          display: flex;
          align-items: flex-start;

          padding: 16px 8px;

          border-bottom: 1px solid #e9eaed;
        }
        
        .category {
          display: flex;
          justify-content: center;
          align-items: center;
          width: 64px;
          height: 64px;
          min-width: 64px;
          min-height: 64px;

          margin-right: 16px;

          border-radius: 50%;
          background: var(--lighten-color);
        }

        .category-icon {
          width: 36px;
          height: 36px;
        }

        .info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .name {
          margin: 0;
        }

        .distance {
          color: var(--primary-color);
        }

        .description {
          display: -webkit-box;

          padding-top: 8px;

          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      </style>

      <li>
        <div class="category">
          <img
            src="assets/categories/${this.getAttribute('category')}.png"
            alt="${this.getAttribute('category')}"
            class="category-icon"
          >
        </div>
        <div class="info">
          <h3 class="name text-subtitle">
            ${this.getAttribute('name') ?? ''}
          </h3>
          <span class="distance text-body">
            캠퍼스부터 ${this.getAttribute('distance' ?? '')}분 내
          </span>
          <p class="description text-body">${this.getAttribute('description') ?? ''}</p>
        </div>
      </li>
    `;
  }
}

customElements.define('r-restaurant-list-item', RestaurantListItem);

export default RestaurantListItem;
