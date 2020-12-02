import BaseComponent from "./BaseComponent";

export default class Popup extends BaseComponent {
  constructor(popup, container, template, closeButton, closeField, popupInstance) {
    super();
    this.popup = popup;
    this.container = container;
    this.template = template;
    this.closeButton = closeButton;
    this.closeField = closeField;
    this.popupInstance = popupInstance;
    this.page = document.querySelector('.page');
  }

  _setContent() {
    this.container.insertAdjacentHTML('beforeend', this.template);
  }

  _clearContent() {
    if(this.container.lastElementChild.classList.contains('popup__form-container')) this.container.removeChild(this.container.lastElementChild);

    // this.container.lastElementChild.remove();
  }

  open() {
    this._clearContent();
    const parent = this;
    this._setContent();
    this.popup.classList.add('popup_is-opened');
    this.page.classList.add('page_noscroll');
    this._setListeners([
      {
        elem: this.closeButton,
        event: 'click',
        callback: () => {
          this.close();
        },
      },
      {
        elem: this.closeField,
        event: 'click',
        callback: () => {
          this.close();
        },
      },
      {
        elem: document.querySelector('.popup__another-popup-button'),
        event: 'click',
        callback: () => {
          parent.close();
          this.popupInstance();
        },
      }
    ]);
  }

  close() {
    this._clearContent();
    this.popup.classList.remove('popup_is-opened');
    this.page.classList.remove('page_noscroll');
    this._clearListeners();
  }
}