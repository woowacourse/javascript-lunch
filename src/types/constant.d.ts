type OptionsType = { [key: string]: string };

type SelectAttributeType = {
  id: string;
  name: string;
  options: OptionsType;
};

type SelectFieldType = {
  [key: string]: SelectAttributeType;
};

type FieldIdsType = {
  requiredIds: string[];
  selectIds: string[];
};

type ConvertType = { [key: string]: string };
