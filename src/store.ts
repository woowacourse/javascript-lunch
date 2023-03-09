import { TabType } from './types/type';

interface IStore {
  currentTab: TabType;
}
export const store: IStore = {
  currentTab: 'all',
};
