import App from './app';
import './components';
import style from './style/index.css';

document.adoptedStyleSheets = [style];

async function waitForCustomElementsDefined() {
  await Promise.all(
    ['r-restaurant-list', 'r-select', 'r-modal', 'r-select'].map((tagName) =>
      customElements.whenDefined(tagName),
    ),
  );
}

waitForCustomElementsDefined().then(() => {
  console.log('Starting App...');
  const app = new App();
  app.init();
});
