import Header from './components/Header.js';
import PlusButton from './components/button/PlusButton.js';
import RestaurantAddModal from './components/modal/RestaurantAddModal.js';
import RestaurantIcon from './components/restaurant/RestaurantIcon.js';
import RestaurantItem from './components/restaurant/RestaurantItem.js';
import RestaurantList from './components/restaurant/RestaurantList.js';
import { $ } from './util/selector.js';

addEventListener('load', () => {
  const body = $('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);

  const main = $('main');

  main.appendChild(RestaurantList());

  const { modal: restaurantAddModal, open, close } = RestaurantAddModal();

  main.appendChild(restaurantAddModal);

  const plusButton = $('.gnb__button');
  plusButton.addEventListener('click', () => {
    open();
  });

  $('.button--secondary').addEventListener('click', () => {
    close();
  });

  const Form = $('form');
  Form.addEventListener('submit', (e) => {
    e.preventDefault();

    const formData = new FormData(Form);
    const data = Object.fromEntries(formData.entries()); // JSON 형태로 변환
    handleSubmit(data);
    Form.reset();
    close();
  });
});

const handleSubmit = ({ name, distance, description, category }) => {
  const item = RestaurantItem({
    name,
    distance,
    description,
    icon: RestaurantIcon({ src: `../images/category-${category}.png`, alt: category }),
  });

  const restaurantList = $('.restaurant-list').appendChild(item);
};
