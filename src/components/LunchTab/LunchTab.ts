import '../LunchTabButton/LunchTabButton';

const LUNCH_TAB = /* HTML */ `
  <div class="lunch-tab">
    <lunch-tab-button class="tab-all"></lunch-tab-button>
    <lunch-tab-button class="tab-liked tab-liked--closed"></lunch-tab-button>
  </div>
`;

class LunchTab extends HTMLElement {
  connectedCallback() {
    this.render();
    this.handleTabLiked();
    this.handleTabAll();
  }

  render() {
    this.innerHTML = LUNCH_TAB;
  }

  handleTabLiked() {
    this.querySelector('.tab-liked')?.addEventListener('click', () => {
      console.log('tab-liked 클릭');
      this.querySelector('.tab-all')?.classList.add('tab-all--closed');
      this.querySelector('.tab-liked')?.classList.remove('tab-liked--closed');
    });
  }

  handleTabAll() {
    this.querySelector('.tab-all')?.addEventListener('click', () => {
      console.log('tab-all 클릭');
      this.querySelector('.tab-all')?.classList.remove('tab-all--closed');
      this.querySelector('.tab-liked')?.classList.add('tab-liked--closed');
    });
  }
}

customElements.define('lunch-tab', LunchTab);
