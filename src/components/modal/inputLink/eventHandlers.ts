import restaurantStateStore from '../../../store/RestaurantStateStore';
import removeHTMLElementByClassName from '../../../utils/removeHTMLElementByClassName';

const linkEventHandler = (link: HTMLElement) => {
  link.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      const inputLink = event.target.value;
      removeHTMLElementByClassName('invalid_link');
      restaurantStateStore.setLink(inputLink);
    }
  });
};

const inputRestaurantLinkHandler = () => {
  const link = document.getElementById('link');
  if (link) {
    linkEventHandler(link);
  }
};

export default inputRestaurantLinkHandler;
