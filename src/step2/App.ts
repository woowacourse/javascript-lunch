import Header from './components/Header';
import NavTab from './components/NavTab';
import { TAB } from './constants/restaurantTypes';
import useModal from './hooks/useModal';
import useTab from './hooks/useTab';
import { $ } from './utils/@common/domHelper';
import EventManager from './utils/@common/EventManager';

function App() {
  const eventManager = new EventManager($('#app'));
  const [isModalOpen, openModal, closeModal] = useModal(false);
  const [tab, setTabAll, setTabFavorite] = useTab(TAB.ALL);
  console.log('렌더링 카운트');
  // eventManager.addEvent('click', '.button', () => console.log('추가하기'));
  return `
    <div>
      ${Header({ openModal })}
      ${NavTab({ tab, setTabAll, setTabFavorite })}
    </div>
  `;
}

export default App;
