import Header from './components/Header/Header';
import TabMenu from './components/TabMenu/TabMenu';
import { TAB_MENUS } from './constant/constants';

const App = {
  initApp() {
    Header();
    TabMenu(TAB_MENUS);
  },
};

export default App;
