import './TabItem.css';
import { $ } from '../utils/domSelectors';
import { TAB_ID } from '../constants/constants';

export const TabItem = (tabInfo: { tabId: string; tabTitle: string; isChecked: boolean }) => {
  const { tabId, tabTitle, isChecked } = tabInfo;
  const checked = isChecked ? 'checked="checked"' : '';

  return `
    <input type="radio" name="tab" class="tab-link" id="${tabId}" ${checked} />
    <label for="${tabId}" class="text-subtitle">${tabTitle}</label>`;
};

export const renderTabItem = (tabInfo: { tabId: string; tabTitle: string; isChecked: boolean }) => {
  const tabs = $<HTMLDivElement>('.tabs');
  const tabItem = TabItem(tabInfo);

  tabs.insertAdjacentHTML('beforeend', tabItem);
};

export const addTabClickEventHandler = (onChangeTab: CallableFunction) => {
  const tabs = $<HTMLDivElement>('.tabs');

  tabs.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement)) return false;
    if (Object.values(TAB_ID).includes(event.target.id)) onChangeTab(event.target.id);
  });
};
