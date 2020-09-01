import BaseComponent from "./BaseComponent";

export default class Popup extends BaseComponent {
  constructor(popup, container, template, closeButton) {
    super();
    this.popup = popup;
    this.container = container;
    this.template = template;
    this.closeButton = closeButton;
  }

  _setContent() {
    this.container.insertAdjacentHTML('beforeend', this.template);
  }

  _clearContent() {
    this.container.removeChild(this.container.lastElementChild);
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
      }
    ]);
  }

  _close() {
    this._clearContent();
    this.container.classList.remove('popup_is-opened');
    this._clearListeners();
  }
}