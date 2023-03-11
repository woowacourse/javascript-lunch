type SelectorStyle = {
  name: 'category' | 'sorting';
  id: 'category-filter' | 'sorting-filter';
  options: { value: string; name: string }[];
};

export { SelectorStyle };
