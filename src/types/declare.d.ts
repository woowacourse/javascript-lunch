// NOTE: TS에서 CSS 등을 모듈로 인식하도록 정의

declare module '*.css' {
  const classes: { [key: string]: string };
  export default classes;
}

declare module '*.png' {
  const value: any;
  export = value;
}
