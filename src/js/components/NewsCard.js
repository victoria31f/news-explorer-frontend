import BaseComponent from "./BaseComponent";

export default class NewsCard extends BaseComponent {
  constructor(loginPopup) {
    super();
    this.loginPopup = loginPopup;
  }

  renderIcon(image, date, title, text, source, link, loggedIn, saveArticle, keyword) {
    this.link = link;
    this.card = document.createElement('div');
    this.card.classList.add('grid__item','card');
    this.card.insertAdjacentHTML('beforeend', `
          <picture class="grid__image">
            <source media="(max-width:767px)" srcset="${image}">
            <img class="card__image" src="${image}" alt="flowers">
          </picture>
          <div class="card__btn-container">
            <button class="button card__button-login hidden">Войдите, чтобы сохранять статьи</button>
            <button class="button button_square button_bookmark card__button"></button>
          </div>
          <div class="card__content">
            <p class="card__date">${date}</p>
            <h3 class="card__title">${title}</h3>
            <p class="card__text">${text}</p>
            <p class="card__source">${source}</p>
          </div>`
    )

    if(loggedIn) {
      this.setListenerLoggedIn(saveArticle, keyword, title, text, date, source, link, image);
    } else {
      this.setListenerLoggedOut();
    }

    return this.card;
  }

  setListenerLoggedOut() {
    this.card.addEventListener('click', this._showLogin);
  }

  setListenerLoggedIn(saveArticle, keyword, title, text, date, source, link, image) {
    this.card.addEventListener('click', function saveHandler(event) {
      if (event.target.classList.contains('button_bookmark')) {
        saveArticle(keyword, title, text, date, source, link, image)
          .then(data => {
            if(data.date) {
              event.target.classList.add('button_bookmark-saved');
            }
          })
      }
    });

  }

  _showLogin = (event) => {
    if (event.target.classList.contains('button_bookmark')) {
      this.loginButton = event.target.parentNode.querySelector('.card__button-login');
      this.loginButton.classList.remove('hidden');
      this.loginButton.addEventListener('click', this._loginHandler);
    }
  }

  _loginHandler = () => {
    this.loginPopup();
    this.loginButton.classList.add('hidden');
    // this.container.removeEventListener('click', this._eventHandler);
    this.loginButton.removeEventListener('click', this._loginHandler);
  }


  _save = (event) => {
    event.target.classList.toggle('button_bookmark-saved');
  }

  // _delete(event) {
  //   this.deleteCard(this._element.id)
  //     .then(() => {
  //       this.removeEventListeners();
  //       this._element.remove();
  //     })
  // }

}