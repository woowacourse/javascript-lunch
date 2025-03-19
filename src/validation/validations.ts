export function isNotSelected(input: string) {
  if (input === '선택해주세요') return true;
}

export function isBlank(name: string) {
  if (name.trim() === '') return true;
}

export function isInvalidLength(name: string, length: number) {
  if (name.length > length) return true;
}
