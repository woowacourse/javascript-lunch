import { useBoolean } from '../../utils/hooks/useBoolean';
import { Header } from './Header';
import { LandingMain } from './LandingMain';
import { AddRestaurantModal } from './AddRestaurantModal';

function App() {
  const [isOpen, open, close] = useBoolean(false);

  return `
    ${Header({ open })}
    ${LandingMain()}
    ${isOpen ? AddRestaurantModal({ close }) : ''}
  `;
}

export { App };
