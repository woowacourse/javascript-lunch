import createDOMElement from '../../util/createDomElement.js';
import { $, $all } from '../../util/selector.js';

interface TabOption {
  label: string;
  onClick: () => void;
}

interface TabProps {
  tabs: TabOption[];
}

function Tab({ tabs }: TabProps) {
  const tabContainer = createDOMElement({
    tag: 'div',
    className: 'tab-container',
    children: [
      createDOMElement({
        tag: 'div',
        className: 'tab-list',
        children: [
          ...tabs.map(({ label, onClick }, index) =>
            createDOMElement({
              tag: 'button',
              className: `tab-button text-subtitle ${index === 0 ? 'active-tab' : ''}`,
              textContent: label,
              onClick: () => {
                updateActiveTab(index);
                onClick();
              }
            })
          ),
          createDOMElement({
            tag: 'div',
            className: 'tab-indicator'
          })
        ]
      })
    ]
  });

  requestAnimationFrame(setInitialIndicatorPosition);

  return tabContainer;
}

export default Tab;

function updateActiveTab(index: number) {
  const buttons = $all('.tab-button');
  buttons.forEach((btn) => btn.classList.remove('active-tab'));
  buttons[index].classList.add('active-tab');

  updateIndicatorPosition(buttons[index]);
}

function setInitialIndicatorPosition() {
  const activeTab = $('.active-tab');
  if (activeTab) {
    updateIndicatorPosition(activeTab);
  }
}

function updateIndicatorPosition(targetTab: HTMLElement) {
  const indicator = $('.tab-indicator');
  const tabRect = targetTab.getBoundingClientRect();
  const tabListRect = $('.tab-list').getBoundingClientRect();

  indicator.style.width = `${tabRect.width}px`;
  indicator.style.transform = `translateX(${tabRect.left - tabListRect.left}px)`;
}
