import modalOpenHandler from './eventHandlers';
import renderHeaderComponent from './renderHandlers';

function Header() {
  renderHeaderComponent();

  modalOpenHandler();
}

export default Header;
