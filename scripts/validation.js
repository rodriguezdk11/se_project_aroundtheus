function showInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
  const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
  console.log(errorMessageEl);
  inputEl.classList.add(inputErrorClass);
  errorMessageEl.textContent = inputEl.validationMessage;
  errorMessageEl.classList.add(errorClass);
}

function checkInputValidity(formEl, inputEl, inputEls, config) {
  if (!inputEl.validity.valid) {
    showInputError(formEl, inputEl, config);
  } else {
    hideInputError(formEl, inputEl, config);
  }

  function hideInputError(formEl, inputEl, { inputErrorClass, errorClass }) {
    const errorMessageEl = formEl.querySelector(`#${inputEl.id}-error`);
    inputEl.classList.remove(inputErrorClass);
    errorMessageEl.textContent = "";
    errorMessageEl.classList.remove(errorClass);
  }

  function toggleButtonState(formEl, formIsValid, options) {
    const submitButton = formEl.querySelector(options.submitButtonSelector);
    if (formIsValid) {
      submitButton.classlist.remove(options.inactiveButtonClass);
      submitButton.disabled = false;
    } else {
      submitButton.classlist.add(options.inactiveButtonClass);
      submitButton.disabled = true;
    }
  }
}
function checkFormValidity(inputEls) {
  if (inputEls.every((input) => input.validity.valid)) {
    return true;
  } else {
    return false;
  }
}

function setEventListeners(formEl, options) {
  const { inputSelector } = options;
  const inputEls = [...formEl.querySelectorAll(inputSelector)];
  inputEls.forEach((inputEl) => {
    inputEl.addEventListener("input", (e) => {
      checkInputValidity(formEl, inputEl, inputEls, options);
    });
  });

  formEl.addEventListener("input", () => {
    checkFormValidity(inputEls, submitButton, config);
  });
}

function enableValidation(options) {
  const formEls = [...document.querySelectorAll(options.formSelector)];
  console.log(formEls);
  formEls.forEach((formEl) => {
    formEl.addEventListener("submit", (e) => {
      e.preventDefault();
    });

    setEventListeners(formEl, options);
    // look for all inputs inside form
    // loop through to see if all are valid
    // if input invalid
    // grab validation message
    // add error class to input
    // display error message
    // disable button
    // if input valid
    // enable button
    // reset error messages});
  });
}

const config = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

enableValidation(config);
