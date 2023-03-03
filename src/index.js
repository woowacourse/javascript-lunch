import App from './app';
import './components';
import './style/index.css';

async function waitForCustomElementsDefined() {
  await Promise.all(
    ['r-restaurant-list', 'r-select', 'r-modal', 'r-select'].map((tagName) =>
      customElements.whenDefined(tagName),
    ),
  );
}

waitForCustomElementsDefined().then(() => {
  const app = new App();
  app.init();
});
