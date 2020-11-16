import BaseComponent from "./BaseComponent";

export default class NewsCardList extends BaseComponent{
  constructor(props) {
    super();
    this.container = props.container;
    this.createCard = props.createCard;
    this.button = props.buttonShowMore;
    this.cardsBlock = props.cardsBlockClass;
    this.hiddenElemClass = props.hiddenElemClass;
    this.loaderBlock = props.loaderBlock;
    this.notFoundBlock = props.notFoundBlock;
    this.loginPopup = props.loginPopupCallback;
  }

  removeAllCards() {
    while (this.container.childElementCount > 0) {
      this.container.lastChild.remove();
    }
  }

  renderCards(cardsArray) {
    this.container.removeEventListener('click', this._eventHandler);
    this.removeAllCards();
    this.cards = cardsArray;
    this._addCard();
    this.removeLoader();
    const resultsBlock = document.querySelector(`.${this.cardsBlock}`);
    if(resultsBlock) {
      resultsBlock.classList.remove(this.hiddenElemClass);
    }
  }

  renderLoader() {
    this.removeCardsBlock();
    this.removeNotFound();
    document.querySelector(`.${this.loaderBlock}`).classList.remove(this.hiddenElemClass);
  }

  removeLoader() {
    const loader = document.querySelector(`.${this.loaderBlock}`);
    if(loader) {
      loader.classList.add(this.hiddenElemClass);
    }
  }

  removeCardsBlock() {
    document.querySelector(`.${this.cardsBlock}`).classList.add(this.hiddenElemClass);
  }

  renderNotFound() {
    this.removeLoader();
    this.removeCardsBlock();
    document.querySelector(`.${this.notFoundBlock}`).classList.remove(this.hiddenElemClass);
  }

  removeNotFound() {
    document.querySelector(`.${this.notFoundBlock}`).classList.add(this.hiddenElemClass);
  }

  renderError() {

  }

  _showMore() {
    this.button.classList.add('more-button_visible');
    this._setListeners([
      {
        elem: this.button,
        event: 'click',
        callback: this._addCard.bind(this),
      }
    ])
  }

  _addCard = () => {
    this.container.append(...this.cards.slice(0, 3));
    this.cards.splice(0, 3);
    if (this.cards.length > 0 && this.cards.length <= 99) {
      this._showMore();
      return;
    }
    this.button.classList.remove('more-button_visible');
  }
}