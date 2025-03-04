class Component {
  constructor($parent, props) {
    this.$parent = $parent;
    this.props = props;

    this.render();
  }

  render() {
    this.template();
  }

  template() {}
}
export default Component;
