import Application from './Application.js';

addEventListener('load', () => {
  const app = document.querySelector('#app');
  if (!app) return;

  app.appendChild(new Application().render());
});
