import './style.css';
import '../LunchItems/LunchItems';

const LUNCH_TAB_LIKED = (liked: boolean) => /* HTML */ `
  <lunch-items liked="${liked}" class="lunch-tab-liked lunch-tab-liked--closed"></lunch-items>
`;

class LunchTabLiked extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    const liked: boolean = true;
    this.innerHTML = LUNCH_TAB_LIKED(liked);
  }
}

customElements.define('lunch-tab-liked', LunchTabLiked);
