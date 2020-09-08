import BaseComponent from "./BaseComponent";

export default class NewsCardList extends BaseComponent{
  constructor(container, createCard, buttonShowMore) {
    super();
    this.container = container;
    this.createCard = createCard;
    this.button = buttonShowMore;
  }

  renderResults(cardsArray) {
    while (this.container.childElementCount > 0) {
      this.container.lastChild.remove();
    }
    this.cards = [];
    cardsArray.forEach(elem => {
      const card = this.createCard(elem.urlToImage, elem.publishedAt, elem.title, elem.description, elem.source.name, elem.url);
      this.cards.push(card);
    });
    console.log(this.cards);
    this.addCard();
  }

  renderLoader() {

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