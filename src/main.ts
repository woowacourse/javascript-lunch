import Application from './Application.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');
  if (!app) return;

  app.appendChild(new Application().element);
});
