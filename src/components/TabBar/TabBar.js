const TabBar = () => {
  return /*html*/ `
    <section class="tab-bar">
      <button class="tab-bar__button active" id="list-tab" data-testid="list-tab">모든 음식점</button>
      <button class="tab-bar__button" id="favorite-tab" data-testid="favorite-tab">자주 가는 음식점</button>
    </section>
  `;
};

export default TabBar;
