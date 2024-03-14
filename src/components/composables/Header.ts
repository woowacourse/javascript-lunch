import { HeaderComponentPropsType } from '../../types/components';

function Header({ className }: HeaderComponentPropsType) {
  const header = Object.assign(document.createElement('header'), {
    className,
  });

  return header;
}

export default Header;
