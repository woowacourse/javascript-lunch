import { CONVERT } from './rules';

export type RequiredIdType = 'name' | 'category' | 'distance';

export const ERROR_MESSAGES = {
  duplicateName: '중복된 가게 이름입니다!',
  requireValue: (id: RequiredIdType) => `${CONVERT[id]}: 필수 입력 값입니다.`,
};
