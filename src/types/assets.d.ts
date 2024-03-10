// NOTE: TS 정적자원 타입 문제 해결
declare module '*.png' {
  const value: any;
  export = value;
}
