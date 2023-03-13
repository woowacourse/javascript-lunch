import tab from './tab';

const tabBar = ({ checkedType }) => {
  const tabProps = [
    { id: 'all', label: '모든 음식점' },
    { id: 'favorite', label: '자주 가는 음식점' },
  ];

  return `
    <div class="tab-bar">
      ${tabProps.map(({ id, label }) => tab({ id, label, checked: id === checkedType })).join('')}
    </div>
  `;
};

export default tabBar;
