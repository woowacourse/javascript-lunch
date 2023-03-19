import { TAB, Tab } from '../../constants/lunchRecommendation';
import { useEvents } from '../../utils/core';
import { useBoolean } from '../../utils/hooks/useBoolean';

interface NavTabProps {
  tab: Tab;
  setTabAll: VoidFunction;
  setTabFavorite: VoidFunction;
}

function NavTab(props: NavTabProps) {
  const { tab, setTabAll, setTabFavorite } = props;
  const [addEvent] = useEvents('.nav-tab');

  addEvent('click', '#nav-tab-1', setTabAll);
  addEvent('click', '#nav-tab-2', setTabFavorite);

  return `
  <nav class="nav-tab">
    <div class="nav-tab-item-container">
      <input id="nav-tab-1" class="nav-tab-item" name="nav-tab" type="radio"
      ${tab === TAB.ALL ? 'checked' : ''} />
      <label class="nav-tab-item-label" for="nav-tab-1">모든 음식점</label>
      <input id="nav-tab-2" class="nav-tab-item" name="nav-tab" type="radio" 
      ${tab === TAB.FAVORITE ? 'checked' : ''}/>
      <label class="nav-tab-item-label" for="nav-tab-2">자주 가는 음식점</label>
    </div>
    <div class="nav-tab-item-underline" data-selected-tab=${Number(!(tab === TAB.ALL))}></div>
  </nav>
  `;
}

export { NavTab };
