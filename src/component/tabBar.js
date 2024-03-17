import { $ } from '../utils/selector';

export function createTabBar(tabs = []) {
  const tabBarsDiv = document.createElement('div');
  tabBarsDiv.className = 'tab__bar';
  tabBarsDiv.append(...render(tabs));
  return tabBarsDiv;
}

function render(tabs) {
  return tabs.map(({ className, text, callback }) => {
    const tabItem = document.createElement('div');
    tabItem.className = className;
    tabItem.textContent = text;
    tabItem.addEventListener('click', (event) => {
      callback();
      if (tabItem.className === 'tab__bar__item') {
        $('.tab__bar__item.checked').classList.toggle('checked');
        tabItem.classList.toggle('checked');
      }
    });
    return tabItem;
  });
}

