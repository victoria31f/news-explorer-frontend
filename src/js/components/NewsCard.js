import BaseComponent from "./BaseComponent";

export default class NewsCard extends BaseComponent {
  constructor() {
    super();
  }

  renderIcon(image, date, title, text, source, link) {
    this.link = link;
    this.card = document.createElement('div');
    this.card.classList.add('grid__item','card');
    this.card.insertAdjacentHTML('beforeend', `
          <picture class="grid__image">
            <source media="(max-width:767px)" srcset="${image}">
            <img class="card__image" src="${image}" alt="flowers">
          </picture>
          <div class="card__btn-container">
            <button class="button button_square button_bookmark card__button"></button>
          </div>
          <div class="card__content">
            <p class="card__date">${date}</p>
            <h3 class="card__title">${title}</h3>
            <p class="card__text">${text}</p>
            <p class="card__source">${source}</p>
          </div>`
    )
    // this._setListeners();
    return this.card;
  }

  _save(event) {
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