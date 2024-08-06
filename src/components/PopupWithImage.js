import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
    this._previewImageModal = this._popupElement.querySelector(
      "#preview-image-modal"
    );
    this._previewImageLabel =
      this._popupElement.querySelector("#modal-image-label");
  }

  open({ name, link }) {
    this._previewImage.src = link;
    this._previewImage.alt = name;
    this._previewImageTitle.textContent = name;
    super.open();
  }
}
