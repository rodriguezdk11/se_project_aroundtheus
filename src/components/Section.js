export default class Section {
  constructor({ item, renderer }, classSection) {
    this._item = item;
    this._renderer = renderer;
    this._classSection = classSection;
  }

  renderItems() {
    this._item.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._classSection.prepend(element);
  }
}
