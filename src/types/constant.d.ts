type SelectedDataType = {
  sorting: {
    id: string;
    name: string;
    options: {
      [key: string]: string;
    };
  };
  category: {
    id: string;
    name: string;
    options: {
      [key: string]: string;
    };
  };
};

type FieldIdsType = {
  requiredIds: string[];
  selectIds: string[];
};

type ConvertType = {
  [key: string]: string;
};
