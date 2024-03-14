type TRestaurantInfoValidator = {
  checkRestaurantName: (name: string) => boolean;
  checkRestaurantDescription: (description: string) => boolean;
};

const restaurantInfoValidator: TRestaurantInfoValidator = {
  checkRestaurantName: (name: string) => {
    if (name.length > 15) return false;
    return true;
  },

  checkRestaurantDescription: (description: string) => {
    if (description.length > 150) return false;
    return true;
  }
};

export default restaurantInfoValidator;
