import { Header } from './Header';
import { RestaurantListContainer } from './RestaurantListContainer';
import { useModal } from '../../utils/hooks/useModal';

function App() {
  const [isAddRestaurantModalOpen, openAddRestaurantModal, closeAddRestaurantModal] =
    useModal(false);

  return `
    ${Header({ openAddRestaurantModal })}
    ${RestaurantListContainer({ isAddRestaurantModalOpen, closeAddRestaurantModal })}
    
    `;
}

export { App };
