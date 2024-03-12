import { HeadingComponentPropsType } from '../../types/components';

function Heading({ textContent, level, className }: HeadingComponentPropsType) {
  const heading = Object.assign(document.createElement(`h${level}`), {
    textContent,
    className,
  });

  return heading;
}

export default Heading;
