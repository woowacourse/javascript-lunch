export default function FilterByValue() {
  const $categorySelect = document.getElementById("category-filter");
  const $restaurantList = document.querySelector(".restaurant-list");
  const allRestaurants = Array.from(document.querySelectorAll(".restaurant"));

  $categorySelect.addEventListener("change", (e) => {
    if (e.target.value === "전체") {
      $restaurantList.innerHTML = "";
      allRestaurants.forEach((item) => {
        $restaurantList.appendChild(item);
      });
      return;
    }
    const filteredItems = allRestaurants.filter((item) => {
      const category = item.querySelector(".category-icon").alt;
      return category === e.target.value;
    });

    $restaurantList.innerHTML = "";
    filteredItems.forEach((item) => {
      $restaurantList.appendChild(item);
    });
  });
}
