import { Header } from './Header';
import { LandingMain } from './LandingMain';
import { AddRestaurantModal } from './AddRestaurantModal';
import { useModal } from '../../utils/hooks/useModal';

function App() {
  const [isAddRestaurantModalOpen, openAddRestaurantModal, closeAddRestaurantModal] =
    useModal(false);

  return `
    ${Header({ open: openAddRestaurantModal })}
    ${LandingMain()}
    ${isAddRestaurantModalOpen ? AddRestaurantModal({ close: closeAddRestaurantModal }) : ''}
    `;
}

export { App };
