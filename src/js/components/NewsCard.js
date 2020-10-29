import BaseComponent from "./BaseComponent";

export default class NewsCard extends BaseComponent {
  constructor(image, date, title, text, source, link, loggedIn, saveOrDeleteArticleCallback, keyword, id, loginPopup) {
    super();
    this.loginPopup = loginPopup;
    this.link = link;
    this.id = id;
    this.image = image;
    this.saveOrDeleteCallback = saveOrDeleteArticleCallback;
    this.date = date;
    this.title = title;
    this.text = text;
    this.source = source;
    this.loggedIn = loggedIn;
    this.keyword = keyword;
  }

  renderIcon() {
    this.card = document.createElement('div');
    this.card.classList.add('grid__item','card');
    if(window.location.pathname === '/articles.html') {
      this.card.insertAdjacentHTML('beforeend', `
          <picture class="grid__image">
            <source media="(max-width:767px)" srcset="${this.image}">
            <img class="card__image" src="${this.image}" alt="flowers">
          </picture>
          <button class="button card__button-left">${this.keyword}</button>
          <div class="card__btn-container">
            <button class="button button_square button_bin card__button"></button>
          </div>
          <div class="card__content">
            <p class="card__date">${this.date}</p>
            <h3 class="card__title">${this.title}</h3>
            <p class="card__text">${this.text}</p>
            <p class="card__source">${this.source}</p>
          </div>`
      );
      // this.card.addEventListener('click', this.binClickHandler.bind(this));
      this.setListenerOnBin(this.saveOrDeleteCallback, this.id);
    } else {
      this.card.insertAdjacentHTML('beforeend', `
          <picture class="grid__image">
            <source media="(max-width:767px)" srcset="${this.image}">
            <img class="card__image" src="${this.image}" alt="flowers">
          </picture>
          <div class="card__btn-container">
            <button class="button card__button-login hidden">Войдите, чтобы сохранять статьи</button>
            <button class="button button_square button_bookmark card__button"></button>
          </div>
          <div class="card__content">
            <p class="card__date">${this.date}</p>
            <h3 class="card__title">${this.title}</h3>
            <p class="card__text">${this.text}</p>
            <p class="card__source">${this.source}</p>
          </div>`
      );

      if(this.loggedIn) {
        this.setListenerOnBookmarkLoggedIn(this.saveOrDeleteCallback, this.keyword, this.title, this.text, this.date, this.source, this.link, this.image);
      } else {
        this.setListenerLoggedOut();
      }
    }
    // this.setListenerOnBin(saveOrDeleteArticleCallback, id);


    return this.card;
  }

  setListenerLoggedOut() {
    this.card.addEventListener('click', this._showLogin.bind(this));
  }

  setListenerOnBookmarkLoggedIn(saveArticle, keyword, title, text, date, source, link, image) {
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

  setListenerOnBin = (deleteArticle, id) => {
    this.card.addEventListener('click', (event) => {
      if(event.target.classList.contains('button_bin')) {
        deleteArticle(id)
          .then((data) => {this.card.remove()})
      }
    });
  }

  _showLogin = (event) => {
    if (event.target.classList.contains('button_bookmark')) {
      this.loginButton = event.target.parentNode.querySelector('.card__button-login');
      this.loginButton.classList.remove('hidden');
      this.loginButton.addEventListener('click', this._loginHandler.bind(this));
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