import RComponent from './RComponent';

class RRestaurant extends RComponent {
  renderTemplate(): string {
    return `
      <style>
        .restaurant {
          display: flex;
          align-items: flex-start;

          padding: 16px 8px;

          border-bottom: 1px solid #e9eaed;
        }
        
        .restaurant__category {
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

        .restaurant__info {
          display: flex;
          flex-direction: column;
          justify-content: flex-start;
        }

        .restaurant__name {
          margin: 0;
        }

        .restaurant__distance {
          color: var(--primary-color);
        }

        .restaurant__description {
          display: -webkit-box;

          padding-top: 8px;

          overflow: hidden;
          text-overflow: ellipsis;
          -webkit-line-clamp: 2;
          -webkit-box-orient: vertical;
        }
      </style>

      <li class="restaurant">
        <div class="restaurant__category">
          <img src="./category-korean.png" alt="한식" class="category-icon">
        </div>
        <div class="restaurant__info">
          <h3 class="restaurant__name text-subtitle">
            ${this.getAttribute('name') ?? ''}
          </h3>
          <span class="restaurant__distance text-body">
            캠퍼스부터 ${this.getAttribute('distance' ?? '')}분 내
          </span>
          <p class="restaurant__description text-body">${this.getAttribute('description') ?? ''}</p>
        </div>
      </li>
    `;
  }
}

customElements.define('r-restaurant', RRestaurant);

export default RRestaurant;
