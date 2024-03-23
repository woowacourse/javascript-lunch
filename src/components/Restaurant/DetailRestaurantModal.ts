import { Restaurant } from '../../interface/RestaurantInterfaces';
import Button from '../Common/Button';
import Modal from '../Modal/Modal';
import CategoryImage from './CategoryImage';
import FavoriteImage from './FavoriteImage';

const detailRestaurantContent = document.createElement('div');

const generateTemplate = (restaurant: Restaurant) => {
  const detailRestaurant = document.createElement('div');
  detailRestaurant.classList.add('detail-restaurant');

  const detailRestaurantImage = document.createElement('div');
  detailRestaurantImage.classList.add('detail-restaurant__image');

  const restaurantCategory = document.createElement('div');
  restaurantCategory.classList.add('restaurant__category');
  restaurantCategory.appendChild(CategoryImage(restaurant.category));

  const restaurantFavorite = document.createElement('div');
  restaurantFavorite.appendChild(FavoriteImage(restaurant.favorite));

  detailRestaurantImage.appendChild(restaurantCategory);
  detailRestaurantImage.appendChild(restaurantFavorite);

  const restaurantName = document.createElement('h3');
  restaurantName.classList.add('restaurant__name', 'text-subtitle');
  restaurantName.textContent = restaurant.name;

  const restaurantDistance = document.createElement('span');
  restaurantDistance.classList.add('restaurant__distance', 'text-body');
  restaurantDistance.textContent = `캠퍼스부터 ${restaurant.distance}분 내`;

  const restaurantDescription = document.createElement('p');
  restaurantDescription.classList.add('detail-restaurant__description', 'text-body');
  if (restaurant.description) restaurantDescription.textContent = restaurant.description;

  const restaurantLink = document.createElement('a');
  restaurantLink.classList.add('restaurant__description', 'text-body');
  if (restaurant.link) {
    restaurantLink.setAttribute('href', restaurant.link);
    restaurantLink.textContent = restaurant.link;
  }

  const buttonContainer = document.createElement('div');
  buttonContainer.classList.add('button-container');
  const removeButton = Button('button', 'secondary', '삭제하기');
  const closeButton = Button('button', 'primary', '닫기');
  buttonContainer.appendChild(removeButton);
  buttonContainer.appendChild(closeButton);

  detailRestaurant.appendChild(detailRestaurantImage);
  detailRestaurant.appendChild(restaurantName);
  detailRestaurant.appendChild(restaurantDistance);
  detailRestaurant.appendChild(restaurantDescription);
  detailRestaurant.appendChild(restaurantLink);
  detailRestaurant.appendChild(buttonContainer);

  return detailRestaurant;
};

class DetailRestaurantModal extends Modal {
  #restaurant?: Restaurant;

  constructor(restaurant: Restaurant) {
    detailRestaurantContent.replaceChildren(generateTemplate(restaurant));
    super({ child: detailRestaurantContent });
  }
}

export default DetailRestaurantModal;
