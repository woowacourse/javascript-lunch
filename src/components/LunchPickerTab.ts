import Component from './Component';

class LunchPickerTab extends Component {
  constructor() {
    super();
  }

  setEvent(): void {
    this.$addEvent('.all', 'click', () => this.#changeTabItem('all'));
    this.$addEvent('.favorites', 'click', () => this.#changeTabItem('favorites'));
  }

  #changeTabItem(type: string) {
    this.#changeColor(type);
    this.makeCustomEvent('updateRestaurantList');
  }

  #changeColor(type: string) {
    this.$$('.tab-item').forEach((item) => {
      if (item.classList.contains(type)) {
        item.classList.add('tab-item--checked');
        item.classList.remove('tab-item--disabled');
      } else {
        item.classList.add('tab-item--disabled');
        item.classList.remove('tab-item--checked');
      }
    });
  }

  template(): string {
    return `
      <section class="lunch-picker-tab">
          <div class="tab-item tab-item--checked all">모든 음식점</div>
          <div class="tab-item tab-item--disabled favorites">자주 가는 음식점</div>
      </section>
      `;
  }
}

export default LunchPickerTab;
