import Component from '../core/Component';

class Tab extends Component {
  template() {
    return `
      <div class="tab all-restaurants ${this.props.activeTab === '모든 음식점' ? 'tab-active' : ''}">모든 음식점</div>
      <div class="tab favorite-restaurants ${
        this.props.activeTab === '자주 가는 음식점' ? 'tab-active' : ''
      }">자주 가는 음식점</div>

    `;
  }

  onRender() {
    this.element.addEventListener('click', (e) => {
      const tabElement = e.target.closest('.tab');
      const tabs = this.element.querySelectorAll('.tab');
      tabs.forEach((tab) => tab.classList.remove('tab-active'));
      tabElement.classList.add('tab-active');

      const selectedTab = tabElement.innerText;
      this.props.filterFavorite(selectedTab);
    });
  }
}

export default Tab;
