import restaurantStateStore from '../../../store/RestaurantStateStore';
import removeHTMLElementByClassName from '../../../utils/removeHTMLElementByClassName';

const inputNameEventHandler = (input: HTMLElement) => {
  input.addEventListener('input', (event) => {
    if (event.target instanceof HTMLInputElement) {
      const inputValue = event.target.value;
      removeHTMLElementByClassName('invalid_name');
      restaurantStateStore.setName(inputValue);
    }
  });
};

const inputNameHandler = () => {
  document.addEventListener('DOMContentLoaded', () => {
    const input = document.getElementById('name');

    if (input) {
      inputNameEventHandler(input);
    }
  });
};
export default inputNameHandler;
