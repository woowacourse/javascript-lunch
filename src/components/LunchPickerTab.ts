import Component from './Component';

class LunchPickerTab extends Component {
  constructor() {
    super();
  }

  setEvent(): void {
    this.$addEvent('.all', 'click', () => this.changeColor('all'));
    this.$addEvent('.favorites', 'click', () => this.changeColor('favorites'));
  }

  changeColor(type: string) {
    this.$$('.tab-item').forEach((item) => {
      if (item.classList.contains(type)) {
        item.classList.remove('tab-item--disabled');
      } else {
        item.classList.add('tab-item--disabled');
      }
    });
  }

  template(): string {
    return `
      <section class="lunch-picker-tab">
          <div class="tab-item tab-item--disabled all">
              <p>모든 음식점</p>
          </div>
          <div class="tab-item tab-item--disabled favorites">
              <p>자주 가는 음식점</p>
          </div>
      </section>
      `;
  }
}

export default LunchPickerTab;
