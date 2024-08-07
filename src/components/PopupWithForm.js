import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._popupForm = this._popupElement.querySelector(".modal__form");
    this._handleFormSubmit = handleFormSubmit;
    this._inputList = [...this._popupForm.querySelectorAll(".modal__input")];
  }

  _getInputValues() {
    const formValues = {};
    this._inputList.forEach((inputEl) => {
      formValues[inputEl.name] = inputEl.value;
    });
    return formValues;
  }

  setEventListeners() {
    super.setEventListeners();

    this._popupForm.addEventListener("submit", (e) => {
      e.preventDefault();
      // this._handleProfileEditSubmit(this._getInputValues());
      this._popupForm.reset();
    });
  }
}
