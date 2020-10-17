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

  // _handleListener = (e) => {
  //   e.preventDefault();
  //   if (this._validateInput()) {
  //     this.getInfo();
  //     // this.renderLoader();
  //     this.getCards(this.options.join())
  //       .then(data => {
  //         if (!data.articles) {
  //           return console.log(data);
  //         }
  //         this.renderCards(data.articles);
  //       });
  //     // this.renderLoader();
  //     this.options.splice(0);
  //     this._clear();
  //   }
  // }

  _validateInput() {
      if(!this._validateInputFilled(this.elements[0].value)) {
        this.elements[0].value = 'Нужно ввести ключевое слово';
        // this._setListeners([
        //   {
        //     elem: this.elements[0],
        //     event: 'focus',
        //     callback: () => {
        //       this.elements[0].value = '';
        //     }
        //   }
        // ])
        return false;
      }
      return true;
  }

}
