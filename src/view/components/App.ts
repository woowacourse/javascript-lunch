import { useBoolean } from '../../utils/hooks/useBoolean';
import { Header } from './Header';
import { LandingMain } from './LandingMain';
import { AddFormModal } from './AddFormModal';

function App() {
  const [isOpen, open, close] = useBoolean(false);

  return `
    ${Header({ open })}
    ${LandingMain()}
    ${isOpen ? AddFormModal({ close }) : ''}
  `;
}

export { App };
