import { ASIAN, CHINESE, ETC, JAPANESE, KOREAN, WESTERN } from '../imgs/index';

type CategoryImageType = {
  한식: typeof KOREAN;
  중식: typeof CHINESE;
  일식: typeof JAPANESE;
  아시안: typeof ASIAN;
  양식: typeof WESTERN;
  기타: typeof ETC;
};

export const CATEGORY_IMG: CategoryImageType = {
  한식: KOREAN,
  중식: CHINESE,
  일식: JAPANESE,
  아시안: ASIAN,
  양식: WESTERN,
  기타: ETC,
} as const;
