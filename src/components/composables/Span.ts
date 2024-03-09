import { SpanComponentPropsType } from '../../types/components';

function Span({ text, className }: SpanComponentPropsType) {
  const span = document.createElement('span');
  span.className = className!;
  span.textContent = text;

  return span;
}

export default Span;
