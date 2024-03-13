import Component from './core/Component';

interface ITabMenu {
  $target: HTMLElement;
  props: TabMenuProps;
}

interface TabMenuProps {
  clickEvent: () => void;
}

class TabMenu extends Component<TabMenuProps> {
  constructor({ $target, props }: ITabMenu) {
    super($target, props);
  }

  setEvent() {
    this.$target.addEventListener('click', this.props.clickEvent);
  }
}

export default TabMenu;
