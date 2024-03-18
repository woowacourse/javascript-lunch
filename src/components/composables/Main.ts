import { MainComponentPropsType } from '../../types/components';

function Main({ className }: MainComponentPropsType) {
  const main = Object.assign(document.createElement('main'), {
    className,
  });

  return main;
}

export default Main;
