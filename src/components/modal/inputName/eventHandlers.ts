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
  const input = document.getElementById('name');
  if (input) {
    inputNameEventHandler(input);
  }
};
export default inputNameHandler;
