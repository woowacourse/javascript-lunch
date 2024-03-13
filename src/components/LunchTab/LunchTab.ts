import '../LunchTabButton/LunchTabButton';

const LUNCH_TAB = /* HTML */ `
  <div class="lunch-tab">
    <lunch-tab-button class="tab-button-all" value="모든 음식점"></lunch-tab-button>
    <lunch-tab-button
      class="tab-button-liked tab-button-liked--closed"
      value="자주 가는 음식점"
    ></lunch-tab-button>
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
    this.querySelector('.tab-button-liked')?.addEventListener('click', () => {
      console.log('tab-button-liked 클릭');
      this.querySelector('.tab-button-all')?.classList.add('tab-button-all--closed');
      this.querySelector('.tab-button-liked')?.classList.remove('tab-button-liked--closed');
      document.querySelector('.lunch-tab-all')?.classList.add('lunch-tab-all--closed');
    });
  }

  handleTabAll() {
    this.querySelector('.tab-button-all')?.addEventListener('click', () => {
      console.log('tab-button-all 클릭');
      this.querySelector('.tab-button-all')?.classList.remove('tab-button-all--closed');
      this.querySelector('.tab-button-liked')?.classList.add('tab-button-liked--closed');
      document.querySelector('.lunch-tab-all')?.classList.remove('lunch-tab-all--closed');
    });
  }
}

customElements.define('lunch-tab', LunchTab);
