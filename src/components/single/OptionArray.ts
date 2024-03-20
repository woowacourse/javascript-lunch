export interface Props {
  optionData: Record<string, string>;
}

export const OptionArray = ({ optionData }: Props) => {
  const $optionArray = Object.entries(optionData).map(([key, value]) => {
    const $option = document.createElement('option');

    if (key) {
      $option.value = key;
    }

    $option.text = value;

    return $option;
  });

  return $optionArray;
};
