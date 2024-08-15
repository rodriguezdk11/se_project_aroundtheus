import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  constructor({ popupSelector }) {
    super({ popupSelector });
    // this._previewImagePopup = this._popupElement.querySelector(
    //   "#preview-image-modal"
    // );

    this._previewImagePopup = this._popupElement.querySelector(".modal__image");
    this._previewImageLabel = this._popupElement.querySelector(
      ".modal__image-label"
    );
  }

  open({ name, link }) {
    this._previewImagePopup.src = link;
    this._previewImageLabel.alt = name;
    this._previewImageLabel.textContent = name;
    super.open();
  }
}
