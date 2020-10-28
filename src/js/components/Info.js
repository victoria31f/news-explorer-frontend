export default class Info {
  constructor(props) {
    this.container = props.container;
  }

  renderInfo(username, articlesNumber, keywords) {
    this._checkKeywordsNumber(keywords);
    this.container.insertAdjacentHTML('beforeend', `
      <h3 class="info__subtitle" xmlns="http://www.w3.org/1999/html">Сохранённые статьи</h3>
      <h2 class="section-title info__title">${username}, у вас <span class="info__number">${articlesNumber}</span> сохранённых статей</h2>
      <p class="info__keywords">По ключевым словам: <i class="info__keywords_bold">${this.allKeywords}</i> <span class="info__and hidden">и</span> <i
        class="info__keywords_bold">${this.keywordsRest} ${this.otherWord}</i>
      </p>
    `)
    if(this.keywordsNumber > 2) {
      this.container.querySelector('.info__and').classList.remove('hidden');
    }
  }

  _checkKeywordsNumber(keywords) {
    this.allKeywords = keywords[0];
    this.keywordsNumber = keywords.length;
    if(this.keywordsNumber > 1) {
      // this.keywordTwo = keywords[1];
      this.allKeywords += ', ' + keywords[1];
    }
    this.keywordsRest = '';
    if(this.keywordsNumber === 3) {
      this.keywordsRest = keywords[2];
    }
    if(this.keywordsNumber > 3) {
      this.keywordsRest = keywords.length - 2;
      if(this.keywordsRest === 1 || this.keywordsRest === 21) {
        this.otherWord = 'другому';
        return;
      }
      this.otherWord = 'другим';
      return;
    }
    this.otherWord = '';
  }

}