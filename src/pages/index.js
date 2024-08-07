import "./index.css";
import { initialCards, config } from "../utils/constants.js";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupWithImage.js";
import Section from "../components/Section.js";
import UserInfo from "../components/UserInfo.js";

console.log(initialCards);

const cardData = {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
};

// Elements

const profileEditButton = document.querySelector("#profile-edit-button");
const profileEditModal = document.querySelector("#profile-edit-modal");
const profileEditCloseButton = profileEditModal.querySelector(".modal__close");
const profileTitle = document.querySelector(".profile__title");
const profileDescription = document.querySelector(".profile__description");
const profileTitleInput = document.querySelector("#profile-title-input");
const profileDescriptionInput = document.querySelector(
  "#profile-description-input"
);

const profileEditForm = profileEditModal.querySelector(".modal__form");
const cardListEl = document.querySelector(".cards__list");
const cardTemplate = "#card-template";
const addNewCardButton = document.querySelector(".profile__add-button");
const addNewCardModal = document.querySelector("#add-card-modal");
const addNewCardCloseButton = addNewCardModal.querySelector(".modal__close");
const cardTitleInput = addNewCardModal.querySelector("#card-title-input");
const cardURLInput = addNewCardModal.querySelector("#card-url-input");
const addNewCardForm = document.querySelector("#add-card-form");
const previewModalCloseBtn = document.querySelector(
  "#preview-image-close-button"
);
const previewImageElement = document.querySelector(".modal__image");
const previewImageLabel = document.querySelector(".modal__image-label");
const modalContainer = document.querySelector(".modal__container");
const previewImageModal = document.querySelector("#preview-image-modal");

// Validation
const validationSettings = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};
const editFormValidator = new FormValidator(
  validationSettings,
  profileEditForm
);
const addFormValidator = new FormValidator(validationSettings, addNewCardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

// Event Handlers

function handleProfileEditSubmit(e) {
  //set user info adjust //
  e.preventDefault();
  profileTitle.textContent = profileTitleInput.value;
  profileDescription.textContent = profileDescriptionInput.value;
  closePopup(profileEditModal);
}

function handleAddCardSubmit(e) {
  e.preventDefault();
  const cardTitle = cardTitleInput.value;
  const cardURL = cardURLInput.value;
  const cardData = { name: cardTitle, link: cardURL };
  const cardElement = createCard(cardData);
  cardListEl.prepend(cardElement);
  closePopup(addNewCardModal);
  cardTitleInput.value = "";
  cardURLInput.value = "";
  addFormValidator.disableButton();
}

function closeModalByClick(evt) {
  if (evt.target === evt.currentTarget) {
    closePopup(evt.currentTarget);
  }
}

function openModal(modal) {
  modal.classList.add("modal_opened");
  modal.addEventListener("mousedown", closeModalByClick);
}

function closePopup(modal) {
  modal.classList.remove("modal_opened");
  modal.removeEventListener("mousedown", closeModalByClick);
}

function handleImageClick(card) {
  previewImageElement.src = card.link;
  previewImageElement.alt = card.name;
  previewImageLabel.textContent = card.name;
  openModal(previewImageModal);
}

function createCard(cardData) {
  const card = new Card(cardData, cardTemplate, handleImageClick);
  return card.getView();
}

// Event Listeners

profileEditButton.addEventListener("click", () => {
  const { name, description } = user.getUserInfo();
  profileTitleInput.value = name;
  profileDescriptionInput.value = description;
  openModal(profileEditModal);
});

addNewCardButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

profileEditForm.addEventListener("submit", handleProfileEditSubmit);

addNewCardForm.addEventListener("submit", handleAddCardSubmit);

// Pop Up

const editProfilePopup = new PopupWithForm(
  "#profile-edit-modal",
  handleProfileEditSubmit
);
editProfilePopup.setEventListeners();

const newCardPopup = new PopupWithForm(
  "#add-card-modal",
  handleProfileEditSubmit
);
newCardPopup.setEventListeners();

const previewImagePopup = new PopupWithImage("#preview-image-modal");
previewImagePopup.setEventListeners();

// Section

const section = new Section(
  {
    item: initialCards,
    renderer: (item) => {
      section.addItem(createCard(item));
    },
  },
  cardListEl
);
section.renderItems();

// User Info

const user = new UserInfo({
  name: ".profile__title",
  description: ".profile__description",
});

export function multiply(a, b) {
  return a * b;
}
