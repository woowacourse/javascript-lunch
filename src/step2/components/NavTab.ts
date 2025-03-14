import { Tab, TAB } from '../constants/restaurantTypes';
import { $ } from '../utils/@common/domHelper';
import EventManager from '../utils/@common/EventManager';

interface NavTabProps {
  tab: Tab;
  setTabAll: () => void;
  setTabFavorite: () => void;
}

function NavTab(props: NavTabProps) {
  const eventManager = new EventManager($('#app'));
  const { tab, setTabAll, setTabFavorite } = props;

  /**@todo 왜 렌더링이 2번씩 될까? 그리고 탭 클릭할 때마다 렌더링이 되는데 최적화방법 찾아보자 */
  eventManager.addEvent('click', '#nav-tab-1', () => {
    setTabAll();
  });

  eventManager.addEvent('click', '#nav-tab-2', () => {
    setTabFavorite();
  });

  return `
    <nav class="nav-tab">
      <div class="nav-tab__container">
        <input id="nav-tab-1" class="nav-tab-item" name="nav-tab" type="radio" ${
          tab === TAB.ALL ? 'checked' : ''
        }  />
        
        <label class="nav-tab-item-label" for="nav-tab-1">모든 음식점</label>
        <input id="nav-tab-2" class="nav-tab-item" name="nav-tab" type="radio" ${
          tab === TAB.FAVORITE ? 'checked' : ''
        } />
        
        <label class="nav-tab-item-label" for="nav-tab-2">자주 가는 음식점</label>
      </div>
      <div class="nav-tab-item-underline" data-selected-tab=${
        tab === TAB.ALL ? '0' : '1'
      }></div>
    </nav>
  `;
}

export default NavTab;
