export const MainHeader = {
  template(Button: string) {
    return `
      <header class="gnb">
        <h1 class="gnb__title text-title">점심 뭐 먹지</h1>
        ${Button}
      </header>`;
  },
};
