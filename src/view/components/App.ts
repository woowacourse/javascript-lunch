import { useBoolean } from '../../utils/hooks/useBoolean';
import { Header } from './Header';
import { LandingMain } from './LandingMain';
import { AddRestaurantModal } from './AddRestaurantModal';

function App() {
  const [isAddRestaurantModalOpen, openAddRestaurantModal, closeAdRestaurantModal] =
    useBoolean(false);

  return `
    ${Header({ open: openAddRestaurantModal })}
    ${LandingMain()}
    ${isAddRestaurantModalOpen ? AddRestaurantModal({ close: closeAdRestaurantModal }) : ''}
    `;
}

export { App };
