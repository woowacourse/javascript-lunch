import Span from '../components/composables/Span';
import { SpanElementDataType } from '../types/components';

const generateSpanComponent = (spanOptionData: SpanElementDataType) => {
  const { TAG_CLASS_NAME, TAG_TEXT_CONTENT } = spanOptionData;

  return Span({
    className: TAG_CLASS_NAME ?? '',
    text: TAG_TEXT_CONTENT,
  });
};

export default generateSpanComponent;
