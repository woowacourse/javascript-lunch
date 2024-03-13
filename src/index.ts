import '../templates/style.css';
import '../templates/add-button.png';

import App from './components/App';
import dom from './utils/dom';

new App(dom.getElement('body'));

// const createModalFormSelect = (restaurantList: RestaurantList): void => {
//   const $categoryContainer = dom.getElement('#category-container');
//   new SelectBoxComponent({
//     $target: $categoryContainer,
//     props: {
//       attributes: FORM_CATEGORY_ATTRIBUTE,
//       options: FORM_CATEGORY,
//       restaurantList,
//     },
//   });

//   const $distanceContainer = dom.getElement('#distance-container');
//   new SelectBoxComponent({
//     $target: $distanceContainer,
//     props: {
//       attributes: FORM_DISTANCE_ATTRIBUTE,
//       options: FORM_DISTANCE,
//       restaurantList,
//     },
//   });
// };
