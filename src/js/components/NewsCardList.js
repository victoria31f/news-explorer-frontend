import BaseComponent from "./BaseComponent";

export default class NewsCardList extends BaseComponent{
  constructor(container, createCard, buttonShowMore, cardsBlockClass, hiddenElemClass, loaderBlock, notFoundBlock) {
    super();
    this.container = container;
    this.createCard = createCard;
    this.button = buttonShowMore;
    this.cardsBlock = cardsBlockClass;
    this.hiddenElemClass = hiddenElemClass;
    this.loaderBlock = loaderBlock;
    this.notFoundBlock = notFoundBlock;
  }

  removeAllCards() {
    while (this.container.childElementCount > 0) {
      this.container.lastChild.remove();
    }
  }

  renderResults(cardsArray) {
    this.removeAllCards();
    this.cards = [];
    cardsArray.forEach(elem => {
      const newDate = this.convertDate(elem.publishedAt);
      const card = this.createCard(elem.urlToImage, newDate, elem.title, elem.description, elem.source.name, elem.url);
      this.cards.push(card);
    });
    console.log(this.cards);
    this.addCard();
    this.removeLoader();
    document.querySelector(`.${this.cardsBlock}`).classList.remove(this.hiddenElemClass);
  }

  convertDate(givenDate) {
    const date = new Date(givenDate);
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];
    return date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
  }

  renderLoader() {
    this.removeCardsBlock();
    this.removeNotFound();
    document.querySelector(`.${this.loaderBlock}`).classList.remove(this.hiddenElemClass);
  }

  removeLoader() {
    document.querySelector(`.${this.loaderBlock}`).classList.add(this.hiddenElemClass);
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

  showMore() {
    this.button.classList.add('more-button_visible');
    this._setListeners([
      {
        elem: this.button,
        event: 'click',
        callback: this.addCard,
      }
    ])
  }

  addCard = () => {
    this.container.append(...this.cards.slice(0, 3));
    this.cards.splice(0, 3);
    if (6 < this.cards.length <= 99) {
      this.showMore();
    }
  }
}