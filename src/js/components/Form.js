export default class Form {
  constructor(formElem) {
    this.form = formElem;
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

    if (this._validateInputFilled(elem.value)) {
      this.error.textContent = 'Неправильный формат email';
      return false;
    }

    if (this.form.type === 'email') {
      if (!this._validateInputType(elem)) {
        this.error.textContent = 'Это обязательное поле';
        return false;
      }
    }

    this.error.textContent = '';
    return true;
  }

  _validateForm() {

  }

  // вспомогательный метод, очищает поля формы;
  _clear() {

  }

  // вспомогательный метод, возвращает данные формы
  _getInfo() {

  }


}