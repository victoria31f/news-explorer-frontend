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
    this.serverErr = document.querySelector(`#error-server`);
    this.serverErr.textContent = error;
  }

  _removeServerError() {
    if(this.serverErr) {
      this.serverErr.textContent = '';
    }
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

  setListeners(callback) {
    this.elements = Array.from(this.form.elements).filter(elem => elem.nodeName === 'INPUT');
    this.api = callback;

    this.elements.forEach(elem => {
        this._setListeners([
          {
            elem: elem,
            event: 'input',
            callback: this._validateForm.bind(this),
          },
          {
            elem: elem,
            event: 'focus',
            callback: this._removeServerError.bind(this),
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
    // this._getInfo();
    this.api();
    // this.api(...this.options)
    //   .then(data => {
    //     if (data.data) {
    //       return console.log('Success');
    //     }
    //     this._setServerError(data);
    //   });
    this._clear();
    this.options.splice(0);
  }

  // вспомогательный метод, очищает поля формы;
  _clear() {
    this.elements.forEach(elem => elem.value ='');
  }

  // вспомогательный метод, возвращает данные формы
  getInfo() {
    this.elements.forEach(elem => this.options.push(elem.value));
    return this.options;
  }


}