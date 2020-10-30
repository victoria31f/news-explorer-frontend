import Form from "./Form";

export default class SearchForm extends Form {
  constructor(form, buttonActiveClass) {
    super(form, buttonActiveClass);

  }

  setEventListeners(callback) {
    this.elements = Array.from(this.form.elements).filter(elem => elem.nodeName === 'INPUT');
    this._setListeners([
      {
        elem: this.form,
        event: 'submit',
        callback: callback,
      }
    ])
  }

  _validateInput() {
      if(!this._validateInputFilled(this.elements[0].value)) {
        this.elements[0].value = 'Нужно ввести ключевое слово';
        return false;
      }
      return true;
  }

}
