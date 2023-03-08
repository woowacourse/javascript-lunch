class MenuTab extends HTMLElement {
  constructor() {
    super();
    this.render();
  }
  render() {
    this.innerHTML = `
    <div>
      <input type="radio" name="tabmenu" checked>
      <input type="radio" name="tabmenu">
    </div>
    `;
  }
}
export default MenuTab;
