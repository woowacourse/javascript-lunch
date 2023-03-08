class Tabbar {
  constructor($target) {
    this.$target = $target;
    this.render();
  }

  template() {
    return `
      <nav class="tabbar">
        <ul class="tabbar-selector">
          <li class="current">모든 음식점</li>
          <li>자주 가는 음식점</li>
        </ul>
      </nav>
    `;
  }

  render() {
    this.$target.insertAdjacentHTML('beforeend', this.template());
  }
}
export default Tabbar;
