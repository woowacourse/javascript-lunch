import Header from './components/Header/Header';
import TabMenu from './components/TabMenu/TabMenu';
import { TAB_MENUS } from './constant/constants';
import { $ } from './utils/querySelector';
import OutputView from './views/OutputView';

const App = {
  initApp() {
    Header();
    TabMenu(TAB_MENUS);
    OutputView.renderFilterDropdown();

    this.setModalEvents();
  },

  setModalEvents() {
    const modalBackdrop = $('.modal-backdrop');

    modalBackdrop.addEventListener('click', () => {
      OutputView.closeModal();
    });
  },
};

export default App;
