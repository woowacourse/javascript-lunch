import $template from './index.html';

interface Props {
  defaultActiveKey: string;
  items: {
    key: string;
    label: string;
    children: string;
  }[];
  onChange: (key: string) => void;
}
class LunchTab extends HTMLElement {
  constructor() {
    super();
    this.innerHTML = $template;
  }

  setProps({ defaultActiveKey, items, onChange }: Props) {
    this.render({ defaultActiveKey, items });
    this.setHandleChange({ onChange });
  }

  render({ defaultActiveKey, items }: Omit<Props, 'onChange'>) {
    const $tabContainer = this.querySelector('#tab-container') as HTMLDivElement;
    const $tabs = items
      .map(
        ({ key, label, children }) => `
      <span data-key=${key} class="tab" ${
          defaultActiveKey === key ? 'clicked' : ''
        }>${label}</span> 
    `,
      )
      .join('');
    $tabContainer.innerHTML = $tabs;
  }

  setHandleChange({ onChange }: Pick<Props, 'onChange'>) {
    const $tabContainer = this.querySelector('#tab-container') as HTMLDivElement;

    const changeActiveTab = (e: MouseEvent) => {
      if (!(e.target instanceof HTMLSpanElement)) return;
      if (e.target.hasAttribute('clicked')) return;

      const $tabs = this.querySelectorAll<HTMLSpanElement>('.tab');
      $tabs.forEach(($tab) => {
        if ($tab.hasAttribute('clicked')) $tab.removeAttribute('clicked');
      });

      e.target.setAttribute('clicked', '');
    };

    $tabContainer.addEventListener('click', (e: MouseEvent) => {
      if (!(e.target instanceof HTMLSpanElement)) return;
      changeActiveTab(e);
      onChange(e.target.dataset.key!);
    });
  }
}

export default LunchTab;
