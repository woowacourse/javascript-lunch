import Component from '../core/Component';

import dom from '@/utils/dom';

interface ITabMenuAttributes {
  id: string;
  classNames: string[];
  text: string;
}

interface TabMenuProps {
  attributes: ITabMenuAttributes;
  clickEvent: () => void;
}

class TabMenu extends Component<TabMenuProps> {
  render() {
    const { id, classNames, text } = this.props.attributes;
    const tab = this.createTabItem(id, classNames);
    const tabText = this.createTabText(text);
    tab.appendChild(tabText);
    this.$target.appendChild(tab);
    this.$target = tab;
  }

  setEvent() {
    this.$target.addEventListener('click', () => {
      const Tabs = [...document.querySelectorAll('.tab-item')];
      Tabs.forEach(tab => {
        tab.classList.remove('active-tab');
      });
      this.$target.classList.add('active-tab');
      this.props.clickEvent();
    });
  }

  createTabItem(id: string, classNames: string[]) {
    return dom.create({
      tagName: 'div',
      id,
      classNames,
    });
  }

  createTabText(text: string) {
    return dom.create({
      tagName: 'p',
      text,
    });
  }
}

export default TabMenu;
