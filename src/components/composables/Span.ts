import { SpanComponentPropsType } from '../../types/components';

function Span({ text, className }: SpanComponentPropsType) {
  const span = Object.assign(document.createElement('span'), {
    className,
    textContent: text,
  });

  return span;
}

export default Span;
