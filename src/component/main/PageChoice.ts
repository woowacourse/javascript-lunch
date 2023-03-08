class PageChoice {
  template() {
    return `
    <section class="page-choice-container">
      <div class="every-page choice text-page page-chosen" data-id="every">모든 음식점</div>
      <div class="bookmarked-page choice text-page" data-id="bookmarked">자주 가는 음식점</div>
    </section> 
    `;
  }

  render(target: Element) {
    target.insertAdjacentHTML("beforeend", this.template());
  }
}

export default new PageChoice();
