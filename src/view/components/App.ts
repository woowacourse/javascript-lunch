import { Header } from './Header';
import { LandingMain } from './LandingMain';
import { AddRestaurantModal } from './AddRestaurantModal';
import { useModal } from '../../utils/hooks/useModal';

function App() {
  const [isAddRestaurantModalOpen, openAddRestaurantModal, closeAdRestaurantModal] =
    useModal(false);

  return `
    ${Header({ open: openAddRestaurantModal })}
    ${LandingMain()}
    ${isAddRestaurantModalOpen ? AddRestaurantModal({ close: closeAdRestaurantModal }) : ''}
    `;
}

export { App };
