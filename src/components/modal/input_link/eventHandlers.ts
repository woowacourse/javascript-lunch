import restaurantStateStore from '../../../store/RestaurantStateStore';
import removeHTMLElementByClassName from '../../../utils/removeHTMLElementByClassName';

export const linkEventHandler = (link: HTMLElement) => {
  link.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      const inputLink = event.target.value;
      removeHTMLElementByClassName('invalid_link');
      restaurantStateStore.setLink(inputLink);
    }
  });
};

export const inputLinkHandler = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const link = document.getElementById('link');

    if (link) {
      linkEventHandler(link);
    }
  });
};
