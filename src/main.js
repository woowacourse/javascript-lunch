import Application from './Application.js';

addEventListener('load', () => {
  const $app = document.querySelector('#app');

  const application = new Application();

  $app.appendChild(application.render());
});
