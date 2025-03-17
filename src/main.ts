import Application from './Application.ts';
import eventHandlerInstance from './lib/modules/EventHandler.ts';

addEventListener('load', () => {
  const app = document.querySelector('#app');
  if (!app) return;

  app.appendChild(new Application().element);

  eventHandlerInstance.attachEventListener();
});
