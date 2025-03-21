import RestaurantIcon from './RestaurantIcon';
import FavoriteIcon from './FavoriteIcon';
import Restaurant from '../../../Domain/Restaurant';
import './Restaurant.css';
import './RestaurantDetail.css';

class RestaurantDetail {
  private element: HTMLDivElement;
  private restaurant: Restaurant | null;
  private onFavoriteToggle: ((isFavorite: boolean) => void) | null;

  constructor(
    name: string,
    distance: string,
    category: string,
    description: string,
    link: string,
    isFavorite: boolean = false,
    restaurant: Restaurant | null = null,
    onFavoriteToggle: ((isFavorite: boolean) => void) | null = null,
  ) {
    this.restaurant = restaurant;
    this.onFavoriteToggle = onFavoriteToggle;
    this.element = this.#createRestaurantDetail(name, distance, category, description, link, isFavorite);
  }

  #createRestaurantDetail(
    name: string,
    distance: string,
    category: string,
    description: string,
    link: string,
    isFavorite: boolean,
  ): HTMLDivElement {
    const restaurantDetail = document.createElement('div');
    restaurantDetail.classList.add('restaurant__detail');

    const iconContainer = this.#createIconContainer(category, isFavorite);
    restaurantDetail.appendChild(iconContainer);

    const restaurantName = this.#createRestaurantName(name);
    restaurantDetail.appendChild(restaurantName);

    const restaurantDistance = this.#createRestaurantDistance(distance);
    restaurantDetail.appendChild(restaurantDistance);

    if (description !== '') {
      const restaurantDescription = this.#createRestaurantDescription(description);
      restaurantDetail.appendChild(restaurantDescription);
    }

    if (link !== '') {
      const restaurantLink = this.#createRestaurantLink(link);
      restaurantDetail.appendChild(restaurantLink);
    }

    return restaurantDetail;
  }

  #createIconContainer(category: string, isFavorite: boolean): HTMLDivElement {
    const iconContainer = document.createElement('div');
    iconContainer.classList.add('restaurant__detail__icon__container');

    const restaurantIcon = this.#createRestaurantIcon(category);
    iconContainer.appendChild(restaurantIcon);

    const favoriteIcon = this.#createFavoriteIcon(isFavorite);
    iconContainer.appendChild(favoriteIcon);

    return iconContainer;
  }

  #createRestaurantIcon(category: string): HTMLElement {
    const restaurantIcon = new RestaurantIcon(category);
    return restaurantIcon.getElement();
  }

  #createFavoriteIcon(isFavorite: boolean): HTMLElement {
    const handleFavoriteToggle = (newIsFavorite: boolean) => {
      if (this.onFavoriteToggle) {
        this.onFavoriteToggle(newIsFavorite);
      }
    };

    const favoriteIcon = new FavoriteIcon(isFavorite, this.restaurant ? handleFavoriteToggle : null, true);
    return favoriteIcon.getElement();
  }

  #createRestaurantName(name: string): HTMLHeadingElement {
    const restaurantName = document.createElement('h3');
    restaurantName.classList.add('restaurant__detail__name', 'text-subtitle');
    restaurantName.textContent = name;
    return restaurantName;
  }

  #createRestaurantDistance(distance: string): HTMLSpanElement {
    const restaurantDistance = document.createElement('span');
    restaurantDistance.classList.add('restaurant__detail__distance', 'text-body');
    restaurantDistance.textContent = `캠퍼스부터 ${distance}분 내`;
    return restaurantDistance;
  }

  #createRestaurantDescription(description: string): HTMLParagraphElement {
    const restaurantDescription = document.createElement('p');
    restaurantDescription.classList.add('text-body');
    restaurantDescription.textContent = description;
    return restaurantDescription;
  }

  #createRestaurantLink(link: string): HTMLAnchorElement {
    const restaurantLink = document.createElement('a');
    restaurantLink.classList.add('restaurant__detail__link', 'text-body');
    restaurantLink.href = link;
    restaurantLink.textContent = link;
    restaurantLink.target = '_blank';
    return restaurantLink;
  }

  getElement(): HTMLDivElement {
    return this.element;
  }
}

export default RestaurantDetail;
