import Form from "./Form";

export default class SearchForm extends Form {
  constructor(form, buttonActiveClass) {
    super(form, buttonActiveClass);

  }

  setEventListeners(getCardsApi, renderCardsApi) {
    this.elements = Array.from(this.form.elements).filter(elem => elem.nodeName === 'INPUT');
    this.getCards = getCardsApi;
    this.renderCards = renderCardsApi;
    this._setListeners([
      {
        elem: this.form,
        event: 'submit',
        callback: this._handleListener.bind(this),
      }
    ])
  }

  _handleListener = (e) => {
    e.preventDefault();
    console.log('submit');
    if (this._validateInput()) {
      this._getInfo();
      this.getCards(this.options.join())
        .then(data => {
          console.log(data);
          if (!data.articles) {
            return console.log(data);
          }
          console.log(data.articles);
          this.renderCards(data.articles);
        });
      this.options.splice(0);
      this._clear();
    }
  }

  _validateInput() {
      if(!this._validateInputFilled(this.elements[0].value)) {
        this.elements[0].value = 'Нужно ввести ключевое слово';
        return false;
      }
      return true;
  }

}
