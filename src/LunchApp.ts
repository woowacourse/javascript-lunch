import './reset.css';
import './global.css';
import './components/LunchHeader/LunchHeader';

const LUNCH_APP = `
<lunch-header></lunch-header>\
안녕하세요
<lunch-item-filter></lunch-item-filter>
<lunch-items></lunch-items>
`;

class LunchApp extends HTMLElement {
  connectedCallback() {
    this.render();
  }

  render() {
    this.innerHTML = LUNCH_APP;
  }
}

customElements.define('lunch-app', LunchApp);
