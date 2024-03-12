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

// const createModalFormButton = (restaurantList: RestaurantList): void => {
//   const $buttonContainer = dom.getElement('.button-container');

//   new Button({
//     $target: $buttonContainer,
//     props: {
//       kind: 'close',
//       attributes: CLOSE_BUTTON_ATTRIBUTE,
//       handleCloseModal,
//     },
//   });

//   new Button({
//     $target: $buttonContainer,
//     props: {
//       kind: 'add',
//       attributes: ADD_BUTTON_ATTRIBUTE,
//       restaurantList,
//       handleCloseModal,
//     },
//   });
// };

// const getFormInputTag = (): IFormInput => {
//   const category = dom.getElement('#category') as HTMLInputElement;
//   const name = dom.getElement('#name') as HTMLInputElement;
//   const distance = dom.getElement('#distance') as HTMLInputElement;
//   const link = dom.getElement('#link') as HTMLInputElement;
//   const $addButton = dom.getElement('#button-add') as HTMLButtonElement;
//   return { category, name, distance, link, $addButton };
// };

// const handleFormInput = ({
//   category: $category,
//   name: $name,
//   distance: $distance,
//   link: $link,
//   $addButton,
// }: IFormInput): void => {
//   const category = $category.value as TCategory;
//   const name = $name.value;
//   const distance = $distance.value as unknown as TDistance;
//   const referenceLink = $link.value;

//   if (formValidator.isValidForm({ category, name, distance, referenceLink })) $addButton.disabled = false;
//   else $addButton.disabled = true;
// };
