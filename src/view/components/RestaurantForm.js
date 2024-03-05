export const RESTAURANT_FORM_EVENTS = {
  submit: 'restaurantFormSubmit',
  reset: 'restaurantFormReset',
};

const RestaurantForm = () => {
  const restaurantForm = document.querySelector('#restaurant-form');

  restaurantForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target).entries();
    restaurantForm.dispatchEvent(
      new CustomEvent(RESTAURANT_FORM_EVENTS.submit, {
        detail: { data },
        bubbles: true,
      }),
    );
  });

  restaurantForm.addEventListener('reset', (e) => {
    e.preventDefault();

    restaurantForm.dispatchEvent(
      new CustomEvent(RESTAURANT_FORM_EVENTS.reset, {
        bubbles: true,
      }),
    );
  });
};

export default RestaurantForm;
