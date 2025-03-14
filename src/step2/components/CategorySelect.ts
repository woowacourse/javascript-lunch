import Select from './Select';
import { Category } from '../types/restaurants';
import EventManager from '../utils/@common/EventManager';
import { $ } from '../utils/@common/domHelper';
import { CATEGORIES } from '../constants/options';

interface CategorySelectProps {
  setCategory: (category: Category) => void;
  category: Category;
}

export const CategorySelect = (props: CategorySelectProps) => {
  const { setCategory, category } = props;
  const eventManager = new EventManager($('#app'));

  eventManager.addEvent('change', '#category-filter', (e: Event) => {
    const target = e.target as HTMLSelectElement;
    setCategory(target.value as Category);
  });

  return Select({
    attribute: {
      id: 'category-filter',
      class: 'restaurant-filter',
      name: 'category',
      value: category,
    },
    children: Select.Option({
      options: CATEGORIES,
      selectedValue: category,
    }),
  });
};
