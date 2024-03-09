import { SpanElementDataType } from '../types/components';
import Span from '../components/composables/Span';

const generateSpanComponent = (spanOptionData: SpanElementDataType) => {
  const { TAG_CLASS_NAME, TAG_TEXT } = spanOptionData;

  return Span({
    className: TAG_CLASS_NAME ?? '',
    text: TAG_TEXT,
  });
};

export default generateSpanComponent;
