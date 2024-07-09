class Card {
  constructor({ name, link }, cardTemplate, handleImageClick) {
    this._name = name;
    this._link = link;
    this._cardSelector = cardTemplate;
    this._handleImageClick = handleImageClick;
    this._element = this._getTemplate();
    this._likeButton = this._element.querySelector(".card__like-button");
    this._deleteButton = this._element.querySelector(".card__delete-button");
    this._cardImage = this._element.querySelector(".card__image");
  }

  _getTemplate() {
    const templateElement = document.querySelector(this._cardTemplate);
    if (!templateElement) {
      throw new Error(`Template with selector ${this._cardTemplate} not found`);
    }
    return templateElement.content.firstElementChild.cloneNode(true);
  }
  _setEventListeners() {
    //".card__like-button"
    this._cardElement
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeIcon;
      });
    //".card__delete-button"
    this._cardElement
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._handleDeleteCard();
      });
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => this._handleImageClick(this));
  }

  _handleLikeIcon() {
    this._cardElement
      .querySelector(".card__like-button")
      .classlist.toggle("card__like-button-active");
  }

  _handleDeleteCard() {
    this._cardElement.remove();
    this._cardElement = null;
  }

  _getTemplate() {
    return document
      .querySelector(this._cardSelector)
      .content.querySelector(".card")
      .cloneNode(true);
  }

  getView() {
    this._cardElement = this._getTemplate();

    this._likeButton = this._cardElement.querySelector(".card__like-button");
    this._cardImage = this._cardElement.querySelector(".card__image");
    this._deleteButton = this._cardElement.querySelector(
      ".card__delete-button"
    );
    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitleEl.querySelector(".card__title").textContent = this.name;
    this._setEventListeners();

    return this._cardElement;
  }
}

export default Card;