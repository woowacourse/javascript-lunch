export default function OrderByValue() {
  const $sortSelect = document.getElementById("sorting-filter");
  $sortSelect.addEventListener("change", (e) => {
    const $restaurantList = document.querySelector(".restaurant-list");
    const $restaurantItems = document.querySelectorAll(".restaurant");
    if (e.target.value === "name") {
      const sortedItems = Array.from($restaurantItems).sort((a, b) => {
        const aName = a.querySelector(".restaurant__name").textContent;
        const bName = b.querySelector(".restaurant__name").textContent;

        if (aName < bName) return -1;
        if (aName > bName) return 1;
        return 0;
      });

      $restaurantList.innerHTML = "";
      sortedItems.forEach((item) => {
        $restaurantList.appendChild(item);
      });
    } else if (e.target.value === "distance") {
      const sortedItems = Array.from($restaurantItems).sort((a, b) => {
        const aDistance = a
          .querySelector(".restaurant__distance")
          .textContent.replace(/[^0-9.]/g, "");

        const bDistance = b
          .querySelector(".restaurant__distance")
          .textContent.replace(/[^0-9.]/g, "");

        return aDistance - bDistance;
      });

      $restaurantList.innerHTML = "";
      sortedItems.forEach((item) => {
        $restaurantList.appendChild(item);
      });
    }
  });
}
