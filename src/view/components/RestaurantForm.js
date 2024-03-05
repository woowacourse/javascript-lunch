export const RESTAURANT_FORM_EVENTS = {
  submit: 'restaurantFormSubmit',
  reset: 'restaurantFormReset',
};

const RestaurantForm = () => {
  const restaurantForm = document.querySelector('#restaurant-form');

  restaurantForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const data = new FormData(e.target);
    const formData = [...data.keys()].reduce((formData, key) => {
      const value = data.get(key);
      formData[key] = value;
      return formData;
    }, {});

    if (window.localStorage.getItem('restaurants')) {
      const restaurants = JSON.parse(window.localStorage.getItem('restaurants'));
      restaurants.push(formData);
      window.localStorage.setItem('restaurants', JSON.stringify(restaurants));
    }
    window.localStorage.setItem('restaurants', JSON.stringify([formData]));

    restaurantForm.dispatchEvent(
      new CustomEvent(RESTAURANT_FORM_EVENTS.submit, {
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
