const STORAGE_KEY = "restaurant";

export const RestaurantRepository = {
  getAll: function () {
    const savedData = localStorage.getItem(STORAGE_KEY);
    if (savedData) {
      return JSON.parse(savedData);
    }
    return;
  },

  save: function (restaurantInformation) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(restaurantInformation));
  },
};

export default RestaurantRepository;
