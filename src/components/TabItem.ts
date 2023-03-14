import './TabItem.css';
import { $ } from '../utils/domSelectors';
import { TAB_ID, TAB_TITLE } from '../constants/constants';

const tabInfos = [
  { tabId: TAB_ID.ALL, tabTitle: TAB_TITLE.ALL, isChecked: true },
  { tabId: TAB_ID.FAVORITE, tabTitle: TAB_TITLE.FAVORITE, isChecked: false },
];

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

export const renderTabItemAll = () => {
  tabInfos.forEach((tabInfo) => renderTabItem(tabInfo));
};

export const addTabClickEventHandler = (onChangeTab: CallableFunction) => {
  const tabs = $<HTMLDivElement>('.tabs');

  tabs.addEventListener('change', (event) => {
    if (!(event.target instanceof HTMLInputElement)) return false;
    if (Object.values(TAB_ID).includes(event.target.id)) onChangeTab(event.target.id);
  });
};
