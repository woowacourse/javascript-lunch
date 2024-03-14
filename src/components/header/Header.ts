import convertHTMLStringToDOM from '../../utils/convertHTMLStringToDOM';

import modalOpenHandler from './eventHandlers';
import headerTemplate from './headerTemplate';
import renderHeaderComponent from './renderHandlers';

function Header() {
  renderHeaderComponent();

  modalOpenHandler();
}

export default Header;
