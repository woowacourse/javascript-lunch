import restaurantStateStore from '../../../store/RestaurantStateStore';
import removeHTMLElementByClassName from '../../../utils/removeHTMLElementByClassName';
import isHTMLElement from '../../../utils/isHTMLElement';

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
  if (!isHTMLElement(link)) return null;
  linkEventHandler(link);
};

export default inputRestaurantLinkHandler;
