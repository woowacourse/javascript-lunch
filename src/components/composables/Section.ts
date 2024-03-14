import { SectionComponentPropsType } from '../../types/components';

function Section({ className }: SectionComponentPropsType) {
  const section = Object.assign(document.createElement('section'), {
    className,
  });

  return section;
}

export default Section;
