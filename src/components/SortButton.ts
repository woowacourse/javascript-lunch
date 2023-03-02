const SortButton = {
  template() {
    return `<select name="sorting" id="sorting-filter" class="restaurant-filter">
    <option value="name">이름순</option>
    <option value="distance">거리순</option>
  </select>`;
  },

  setEvent() {
    const sortingFilter = document.querySelector("#sorting-filter");
    sortingFilter?.addEventListener("click", () => {
      // 이벤트 추가 필요
      console.log("sort");
    });
  },
};

export default SortButton;
