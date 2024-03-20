import setAttributes from '../../utils/setAttributes';

interface Props {
  span?: {
    class?: string;
  };
  text: string;
}

export const Span = ({ span, text }: Props): HTMLSpanElement => {
  const $span = document.createElement('span');
  $span.textContent = text;
  setAttributes($span, span);

  return $span;
};
