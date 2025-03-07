import Header from './components/Header.js';
import PlusButton from './components/button/PlusButton.js';
import RestaurantAddModal from './components/modal/RestaurantAddModal.js';
import RestaurantIcon from './components/restaurant/RestaurantIcon.js';
import RestaurantItem from './components/restaurant/RestaurantItem.js';
import RestaurantList from './components/restaurant/RestaurantList.js';
import { $ } from './util/selector.js';

const renderHeader = () => {
  const body = $('body');

  const header = Header({ title: '점심 뭐 먹지', right: PlusButton() });
  body.prepend(header);
};

const renderRestaurantList = () => {
  const main = $('main');

  main.appendChild(RestaurantList());
};

const renderModal = () => {
  const main = $('main');
  const { modal: restaurantAddModal, open, close } = RestaurantAddModal();
  main.appendChild(restaurantAddModal);
  attachModalEvents(open, close);
};

const attachModalEvents = (open, close) => {
  const plusButton = $('.gnb__button');
  plusButton.addEventListener('click', open);

  const closeButton = $('.button--secondary');
  closeButton.addEventListener('click', close);

  const form = $('form');
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const formData = new FormData(form);
    const data = Object.fromEntries(formData.entries());
    handleSubmit(data);
    form.reset();
    close();
  });
};

const handleSubmit = ({ name, distance, description, category }) => {
  const item = RestaurantItem({
    name,
    distance,
    description,
    icon: RestaurantIcon({ src: `images/category-${category}.png`, alt: category }),
  });

  $('.restaurant-list').appendChild(item);
};

renderHeader();
renderRestaurantList();
renderModal();
