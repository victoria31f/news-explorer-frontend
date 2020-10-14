import BaseComponent from "./BaseComponent";

export default class NewsCardList extends BaseComponent{
  constructor(container, createCard, buttonShowMore, cardsBlockClass, hiddenElemClass) {
    super();
    this.container = container;
    this.createCard = createCard;
    this.button = buttonShowMore;
    this.cardsBlock = cardsBlockClass;
    this.hiddenElemClass = hiddenElemClass;
  }

  renderResults(cardsArray) {
    while (this.container.childElementCount > 0) {
      this.container.lastChild.remove();
    }
    this.cards = [];
    cardsArray.forEach(elem => {
      const date = new Date(elem.publishedAt);
      const months = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
      const newDate = date.getDate() + ' ' + months[date.getMonth()] + ', ' + date.getFullYear();
      const card = this.createCard(elem.urlToImage, newDate, elem.title, elem.description, elem.source.name, elem.url);
      this.cards.push(card);
    });
    console.log(this.cards);
    document.querySelector(`.${this.cardsBlock}`).classList.remove(this.hiddenElemClass);
    this.addCard();
  }

  renderLoader(loaderElem) {
    document.querySelector(`.${loaderElem}`).classList.remove(this.hiddenElemClass);
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