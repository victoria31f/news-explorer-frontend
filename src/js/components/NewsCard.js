import BaseComponent from "./BaseComponent";

export default class NewsCard extends BaseComponent {
  constructor(loginPopup) {
    super();
    this.loginPopup = loginPopup;
  }

  renderIcon(image, date, title, text, source, link, loggedIn, saveOrDeleteArticleCallback, keyword, id) {
    this.link = link;
    this.card = document.createElement('div');
    this.card.classList.add('grid__item','card');
    this.saveOrDeleteCallback = saveOrDeleteArticleCallback;
    this.id = id;
    if(window.location.pathname === '/articles.html') {
      this.card.insertAdjacentHTML('beforeend', `
          <picture class="grid__image">
            <source media="(max-width:767px)" srcset="${image}">
            <img class="card__image" src="${image}" alt="flowers">
          </picture>
          <button class="button card__button-left">${keyword}</button>
          <div class="card__btn-container">
            <button class="button button_square button_bin card__button"></button>
          </div>
          <div class="card__content">
            <p class="card__date">${date}</p>
            <h3 class="card__title">${title}</h3>
            <p class="card__text">${text}</p>
            <p class="card__source">${source}</p>
          </div>`
      );
      // this.card.addEventListener('click', this.binClickHandler.bind(this));
      this.setListenerOnBin(saveOrDeleteArticleCallback, id);
    } else {
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
      );

      if(loggedIn) {
        this.setListenerOnBookmarkLoggedIn(saveOrDeleteArticleCallback, keyword, title, text, date, source, link, image);
      } else {
        this.setListenerLoggedOut();
      }
    }
    // this.setListenerOnBin(saveOrDeleteArticleCallback, id);


    return this.card;
  }

  setListenerLoggedOut() {
    this.card.addEventListener('click', this._showLogin);
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

  binClickHandler = (event) => {
    if(event.target.classList.contains('button_bin')) {
      const that = this;
      this.saveOrDeleteCallback(that.id)
        .then((data) => {that.card.remove()})
    }
  }

  setListenerOnBin = (deleteArticle, id) => {
    // const obj1 = this;
    this.card.addEventListener('click', (event) => {
      // const obj2 = obj1;
      if(event.target.classList.contains('button_bin')) {
        // const obj3 = obj2;
        deleteArticle(id)
          .then((data) => {this.card.remove()})
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