class FormValidator {
  constructor(options, formEl) {
    this._inputSelector = options.inputSelector;
    this._submitButtonSelector = options.submitButtonSelector;
    this._inactiveButtonClass = options.inactiveButtonClass;
    this._inputErrorClass = options.inputErrorClass;
    this._errorClass = options.errorClass;
    this._formEl = formEl;
    this._inputEls = [...this._formEl.querySelectorAll(this._inputSelector)];
    this._submitButton = this._formEl.querySelector(this._submitButtonSelector);
  }

  _showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = this._formEl.querySelector(`#${inputEl.id}-error`);
    console.log(errorMessageEl);
    inputEl.classList.add(inputErrorClass);
    errorMessageEl.textContent = inputEl.validationMessage;
    errorMessageEl.classList.add(errorClass);
  }

  _checkInputValidity(formEl, inputEl, inputEls, config) {
    if (!inputEl.validity.valid) {
      showInputError(formEl, inputEl, config);
    } else {
      hideInputError(formEl, inputEl, config);
    }
  }
  _hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  _toggleButtonState(inputEls, submitButton, { inactiveButtonClass }) {
    const isFormValid = checkFormValidity(inputEls);

    if (!isFormValid) {
      submitButton.classList.add(inactiveButtonClass);
      submitButton.disabled = true;
      return;
    }

    submitButton.classList.remove(inactiveButtonClass);
    submitButton.disabled = false;
  }

  _checkFormValidity(inputEls) {
    if (inputEls.every((input) => input.validity.valid)) {
      return true;
    } else {
      return false;
    }
  }

  _setEventListeners(formEl, options) {
    const { inputSelector, submitButtonSelector } = options;
    const inputEls = [...formEl.querySelectorAll(inputSelector)];
    const submitButton = formEl.querySelector(submitButtonSelector);
    inputEls.forEach((inputEl) => {
      inputEl.addEventListener("input", (e) => {
        checkInputValidity(formEl, inputEl, inputEls, options);
        toggleButtonState(inputEls, submitButton, options);
      });
    });
  }

  _enableButton() {
    this._submitButton.classList.remove(this._inactiveButtonClass);
    this._submitButton.disabled = false;
  }

  disableButton() {
    this._submitButton.classList.add(this._inactiveButtonClass);
    this._submitButton.disabled = true;
  }

  _enableValidation(options) {
    const formEls = [...document.querySelectorAll(formSelector)];
    console.log(formEls);
    formEls.forEach((formEl) => {
      formEl.addEventListener("submit", (e) => {
        e.preventDefault();
      });

      this._setEventListeners();
    });

    resetValidation();
    this._inputEls.forEach((inputEl) => {
      this._hideInputError(inputEl);
    });
    this.disableButton();
  }
}

export default FormValidator;
