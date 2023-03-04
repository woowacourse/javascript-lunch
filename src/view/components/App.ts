import { useBoolean } from '../../utils/hooks/useBoolean';
import { Header } from './Header';
import { LandingMain } from './LandingMain';
import { Modal } from './Modal';

function App() {
  const [isOpen, open, close] = useBoolean(false);

  return `
    ${Header({ open })}
    ${LandingMain()}
    ${isOpen ? Modal({ close }) : ''}
  `;
}

export { App };
