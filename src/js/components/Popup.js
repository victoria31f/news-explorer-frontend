import BaseComponent from "./BaseComponent";

export default class Popup extends BaseComponent {
  constructor(popup, container, template, closeButton, closeField, signupPopupInstance) {
    super();
    this.popup = popup;
    this.container = container;
    this.template = template;
    this.closeButton = closeButton;
    this.closeField = closeField;
    this.signupPopupInstance = signupPopupInstance;
  }

  _setContent() {
    this.container.insertAdjacentHTML('beforeend', this.template);
  }

  _clearContent() {
    this.container.removeChild(this.container.lastElementChild);
    // this.container.lastElementChild.remove();
  }

  openSecond() {
    this._clearContent();
    this.open();
  }

  open() {
    this._setContent();
    this.popup.classList.add('popup_is-opened');
    this._setListeners([
      {
        elem: this.closeButton,
        event: 'click',
        callback: () => {
          console.log('click on close');
          this._close();
        },
      },
      {
        elem: this.closeField,
        event: 'click',
        callback: () => {
          console.log('click on close');
          this._close();
        },
      },
      {
        elem: document.querySelector('.popup__signup-button'),
        event: 'click',
        callback: () => {
          console.log('click on signup');
          this.signupPopupInstance();
        },
      },
      {
        elem: document.querySelector('.button-login'),
        event: 'click',
        callback: () => {
          console.log('click on signup');
          this.signupPopupInstance();
        },
      }
    ]);
  }

  _close() {
    this._clearContent();
    this.popup.classList.remove('popup_is-opened');
    this._clearListeners();
  }
}