const createRestaurantDetailModal = () => {
  const RestaurantDetailModal = document.addEventListener(
    "DOMContentLoaded",
    () => {
      const restaurantList = document.querySelector(".restaurant-list");

      restaurantList.addEventListener("click", (event) => {
        let restaurantItem = event.target.closest(".restaurant");
        const restaurantName = restaurantItem
          .querySelector(".restaurant__name")
          .textContent.trim();

        if (restaurantName === "피양콩할마니") {
          console.log("피양콩할마니");
        }
      });
    }
  );
};

export default createRestaurantDetailModal;
