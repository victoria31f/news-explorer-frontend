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

  renderCards(createCardsArrayCallback) {
    this.removeAllCards();
    this.cards = createCardsArrayCallback();
    this._addCard();
    this.removeLoader();
    document.querySelector(`.${this.cardsBlock}`).classList.remove(this.hiddenElemClass);
  }

  renderResults(keywords, cardsArray, loggedIn, saveArticle) {
    this.container.removeEventListener('click', this._eventHandler);
    this.removeAllCards();
    this.cards = [];
    cardsArray.forEach(elem => {
      const newDate = this.convertDate(elem.publishedAt);
      const card = this.createCard(elem.urlToImage, newDate, elem.title, elem.description, elem.source.name, elem.url, loggedIn, saveArticle, keywords);
      this.cards.push(card);
    });
    this._addCard();
    this.removeLoader();
    document.querySelector(`.${this.cardsBlock}`).classList.remove(this.hiddenElemClass);
  }

  renderSavedCards(cardsArray, loggedIn, deleteArticle) {
    this.removeAllCards();
    this.cards = [];
    cardsArray.forEach(elem => {
      const card = this.createCard(elem.image, elem.date, elem.title, elem.text, elem.source, elem.link, loggedIn, deleteArticle, elem.keyword, elem._id);
      this.cards.push(card);
    })
    this._addCard();
  }

//   setListenersLoggedIn(saveArticle) {
//     console.log('listneres if logged in set');
//     this.container.addEventListener('click', function handlerIfLoggedIn (event) {
//       if (event.target.classList.contains('button_bookmark')) {
//         console.log(event.target);
//         console.log(event.currentTarget);
//
//       }
//       });
//   }
//
//
//   setListenersLoggedOut() {
//     console.log('listneres set');
//     this.container.addEventListener('click', this._eventHandler);
//   }
//
//   _eventHandler = (event) => {
//     console.log('in event handler');
//     if (event.target.classList.contains('button_bookmark')) {
//       console.log(event.target);
//       console.log(event.currentTarget);
//       this.loginButton = event.target.parentNode.querySelector('.card__button-login');
//       this.loginButton.classList.remove(this.hiddenElemClass);
//       this.loginButton.addEventListener('click', this._loginHandler);
//     }
//   }
//
//   _loginHandler = () => {
//     this.loginPopup();
//     this.loginButton.classList.add(this.hiddenElemClass);
//     // this.container.removeEventListener('click', this._eventHandler);
//     this.loginButton.removeEventListener('click', this._loginHandler);
// }

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

  _showMore() {
    this.button.classList.add('more-button_visible');
    this._setListeners([
      {
        elem: this.button,
        event: 'click',
        callback: this._addCard,
      }
    ])
  }

  _addCard = () => {
    this.container.append(...this.cards.slice(0, 3));
    this.cards.splice(0, 3);
    if (6 < this.cards.length <= 99) {
      this._showMore();
    }
  }
}