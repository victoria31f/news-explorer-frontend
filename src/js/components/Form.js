import BaseComponent from "./BaseComponent";

export default class Form extends BaseComponent {
  constructor(form) {
    super();
    this.form = form;
    // this.elements = this.form.elements;
    this.submitButton = this.form.elements['submit'];
    this.options = [];
  }

  setServerError() {

  }

  _validateInputFilled(value) {
    return value !== '';
  }

  _validateInputType(value) {
    return value.validity.typeMismatch;
  }


  _validateInputElement(elem) {
    this.error = document.querySelector(`#error-${elem.id}`);

    if (!this._validateInputFilled(elem.value)) {
      this.error.textContent = 'Это обязательное поле';
      return false;
    }

    if (elem.type === 'email') {
      if (this._validateInputType(elem)) {
        this.error.textContent = 'Неправильный формат email';
        return false;
      }
    }

    this.error.textContent = '';
    return true;
  }

  _setButtonStateInactive() {
    this.submitButton.setAttribute('disabled', true);
    this.submitButton.classList.remove(`popup__button_active`);
  }

  _setButtonStateActive() {
    this.submitButton.removeAttribute('disabled');
    this.submitButton.classList.add(`popup__button_active`);
  }

  _validateForm() {
    let allValid = true;
    this.elements
      .forEach(elem => {
        allValid = this._validateInputElement(elem) && allValid;
      });
    if(allValid) {
      this._setButtonStateActive();
    } else {
      this._setButtonStateInactive();
    }
  }

  setListeners(apiSubmit) {
    this.elements = Array.from(this.form.elements).filter(elem => elem.nodeName === 'INPUT');

    this.elements.forEach(elem => {
        this._setListeners([
          {
            elem: elem,
            event: 'input',
            callback: this._validateForm.bind(this),
          }
        ])
      })
    this._setListeners([
      {
        elem: this.form,
        event: 'submit',
        callback: (e) => {
          e.preventDefault();
          this._getInfo();
          apiSubmit([...this.options]);
        }
      }
    ])
  }

  // вспомогательный метод, очищает поля формы;
  _clear() {

  }

  // вспомогательный метод, возвращает данные формы
  _getInfo() {
    this.elements.forEach(elem => this.options.push(elem.value));
  }


}