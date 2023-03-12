/// <reference types="cypress" />

import { getContainerEl, setupHooks } from '@cypress/mount-utils';

Cypress.on('run:start', () => {
  if (Cypress.testingType !== 'component') return;

  Cypress.on('test:before:run', () => {
    getContainerEl().innerHTML = '';
  });
});

export function mount(template: string): Cypress.Chainable {
  const containerEl = getContainerEl();

  const $fragment = document.createElement('div');
  $fragment.innerHTML = template.trim();

  const $component = $fragment.firstChild!;

  containerEl.appendChild($component);

  return cy.wrap(document.querySelector('#root'), { log: false });
}

// Setup Cypress lifecycle hooks.
setupHooks();
