import { $ } from '../utils/common';

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

  setEvent(listRender, favoriteRender, filterOpen, filterClose) {
    const tabbar = $('.tabbar');

    tabbar.addEventListener('click', e => {
      if (e.target.textContent === '모든 음식점') {
        $('ul.tabbar-selector li.current').classList.remove('current');
        e.target.classList.add('current');
        filterOpen();
        listRender();
        return;
      }

      $('ul.tabbar-selector li').classList.remove('current');
      e.target.classList.add('current');
      filterClose();
      favoriteRender();
    });
  }
}
export default Tabbar;
