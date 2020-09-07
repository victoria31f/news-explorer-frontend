import BaseComponent from "./BaseComponent";

export default class Form extends BaseComponent {
  constructor(form, buttonActiveClass) {
    super();
    this.form = form;
    this.buttonActiveClass = buttonActiveClass;
    // this.elements = this.form.elements;
    this.submitButton = this.form.elements['submit'];
    this.options = [];
  }

  setServerError(error) {
    document.querySelector(`#error-server`).textContent = error;
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
    this.submitButton.classList.remove(this.buttonActiveClass);
  }

  _setButtonStateActive() {
    this.submitButton.removeAttribute('disabled');
    this.submitButton.classList.add(this.buttonActiveClass);
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
    this.api = apiSubmit;

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
        callback: this._handleSubmitListener.bind(this),
      }
    ])
  }

  _handleSubmitListener = (e) => {
    e.preventDefault();
    this._getInfo();
    this.api(...this.options)
      .then(err => {
        this.setServerError(err);
        this.options.splice(0);
        this._clear();
      });
  }

  // вспомогательный метод, очищает поля формы;
  _clear() {
    this.elements.forEach(elem => elem.value ='');
  }

  // вспомогательный метод, возвращает данные формы
  _getInfo() {
    this.elements.forEach(elem => this.options.push(elem.value));
  }


}