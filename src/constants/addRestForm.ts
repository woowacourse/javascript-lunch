import { CATEGORY, DISTANCE } from './restaurant';

const DEFAULT = { '': '선택해주세요' } as const;

export const FORM_OPTIONS = {
  category: { ...DEFAULT, ...CATEGORY },
  distance: { ...DEFAULT, ...DISTANCE }
} as const;
