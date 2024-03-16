import createButton from '../button';
import modal from '../modal';
import { createStarButton } from '../starButton';
import { KOREAN_CATEGORY } from '../../constant/select';
import { createCategoryImage } from '../categoryImage';

export function createRestaurantDetail({
  restaurant,
  favoriteRestaurantNames,
  starCallback,
  deleteCallback,
  cancelCallback,
}) {
  const container = render({
    restaurant,
    favoriteRestaurantNames,
    starCallback,
    cancelCallback,
  });
  container
    .querySelector('form')
    .addEventListener('submit', (event) => deleteCallback(event));
  return container;
}

function render({
  restaurant: { category, name, walkingTime, description = '', link = '' },
  favoriteRestaurantNames,
  starCallback,
  cancelCallback,
}) {
  const container = modal.createContainer();

  const form = document.createElement('form');
  const categoryDiv = createCategoryImage(category);

  const headerDiv = document.createElement('div');
  headerDiv.className = 'modal__restaurantDetail__header';
  const star = createStarButton(name, favoriteRestaurantNames, starCallback);

  headerDiv.append(categoryDiv, star);

  const infoHeaderTextArea = document.createElement('div');
  infoHeaderTextArea.className = 'restaurant__info';

  const restaurantName = document.createElement('h3');
  restaurantName.className = 'restaurant__name text-subtitle';
  restaurantName.textContent = name;

  const restaurantDistance = document.createElement('span');
  restaurantDistance.className = 'restaurant__distance text-body';
  restaurantDistance.textContent = `캠퍼스부터 ${walkingTime}분 내`;

  const restaurantDescription = document.createElement('p');
  restaurantDescription.className = 'modal__restaurant__description text-body';
  restaurantDescription.textContent = description;

  const restaurantLink = document.createElement('a');
  restaurantLink.className = 'modal__restaurant__link text-body';
  restaurantLink.textContent = link;
  restaurantLink.href = link;

  infoHeaderTextArea.append(
    restaurantName,
    restaurantDistance,
    restaurantDescription,
    restaurantLink
  );

  const buttonWrapper = document.createElement('div');
  buttonWrapper.className = 'button-container';

  const cancelButton = createButton({
    className: 'button button--secondary text-caption',
    type: 'submit',
    eventType: 'submit',
    name: '삭제하기',
  });

  const addButton = createButton({
    className: 'button button--primary text-caption',
    eventType: 'click',
    name: '닫기',
    callback: cancelCallback,
  });

  buttonWrapper.append(cancelButton, addButton);

  form.append(headerDiv, infoHeaderTextArea, buttonWrapper);

  container.append(form);

  return container;
}
