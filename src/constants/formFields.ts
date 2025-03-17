import $select from "../components/common/select.ts";
import $input from "../components/common/input.ts";
import $textarea from "../components/common/textarea.ts";
import { categoryOptions, distanceOptions } from "../data/selectOptions.ts";

type BaseField = {
  label: string;
  attribute: {
    required?: boolean;
    id: string;
    name: string;
    type?: string;
    maxlength?: number;
    placeholder?: string;
  };
  helperText?: string;
};

type SelectField = BaseField & {
  options: Record<string, string | number>;
};

type TextareaField = BaseField & {
  attribute: BaseField["attribute"] & {
    cols?: string;
    rows?: string;
  };
};

type FormField = BaseField | SelectField | TextareaField;

export type FieldGroup = {
  fields: Record<string, FormField>;
  create: (info: FormField) => HTMLElement;
};

type FormFields = {
  INPUTS: FieldGroup;
  SELECTS: FieldGroup;
  TEXTAREAS: FieldGroup;
};

export const FORM_FIELDS: FormFields = Object.freeze({
  INPUTS: Object.freeze({
    fields: {
      name: {
        label: "이름",
        attribute: {
          required: true,
          id: "name",
          name: "name",
          type: "text",
          maxlength: 30,
          placeholder: "음식점 이름을 입력해주세요.",
        },
      },
      link: {
        label: "참고 링크",
        attribute: {
          id: "link",
          name: "link",
          type: "text",
          maxlength: 100,
          placeholder: "https://www.woowacourse.io/",
        },
      },
    },
    create: (info: FormField) => $input(info),
  }),
  SELECTS: Object.freeze({
    fields: {
      category: {
        label: "카테고리",
        options: categoryOptions,
        attribute: {
          required: true,
          id: "category",
          name: "category",
        },
      },
      distance: {
        label: "거리(도보 이동 시간)",
        options: distanceOptions,
        attribute: {
          required: true,
          id: "distance",
          name: "distance",
        },
      },
    },
    create: (info: FormField) => {
      if ("options" in info) return $select(info);
      throw new Error("select에 옵션 값이 없습니다.");
    },
  }),
  TEXTAREAS: Object.freeze({
    fields: {
      description: {
        label: "설명",
        helperText: "메뉴 등 추가 정보를 입력해 주세요.",
        attribute: {
          id: "description",
          name: "description",
          cols: "30",
          rows: "5",
          maxlength: 200,
          placeholder: "너무 맛있는데 너무 매워서 배가 아파요,,,",
        },
      },
    },
    create: (info: FormField) => $textarea(info),
  }),
} as const);
