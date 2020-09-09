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
  }

  _setContent() {
    this.container.insertAdjacentHTML('beforeend', this.template);
  }

  _clearContent() {
    this.container.removeChild(this.container.lastElementChild);
    // this.container.lastElementChild.remove();
  }

  open() {
    const parent = this;
    this._setContent();
    this.popup.classList.add('popup_is-opened');
    this._setListeners([
      {
        elem: this.closeButton,
        event: 'click',
        callback: () => {
          console.log('click on close');
          this.close();
        },
      },
      {
        elem: this.closeField,
        event: 'click',
        callback: () => {
          console.log('click on close field');
          this.close();
        },
      },
      {
        elem: document.querySelector('.popup__another-popup-button'),
        event: 'click',
        callback: () => {
          console.log('click on signup');
          parent.close();
          this.popupInstance();
        },
      }
    ]);
  }

  close() {
    this._clearContent();
    this.popup.classList.remove('popup_is-opened');
    this._clearListeners();
  }
}