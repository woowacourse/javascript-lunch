class App {
  constructor() {
    this.init();
  }

  init() {
    this.renderContainer();
  }

  renderContainer() {
    document.body.innerHTML = `
      <header class="gnb"></header>
      <main>
        <section class="restaurant-filter-container"></section>
        <section class="restaurant-list-container"></section>
        <div class="modal modal--open">
          <div class="modal-backdrop"></div>
          <div class="modal-container"></div>
        </div>
      </main>
    `;
  }
}

export default App;
