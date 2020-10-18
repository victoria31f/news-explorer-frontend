export default class Info {
  constructor(props) {
    this.container = props.container;
  }

  renderInfo(username, articlesNumber, keywords) {
    this._checkKeywordsNumber(keywords);
    this.container.insertAdjacentHTML('beforeend', `
      <h3 class="info__subtitle">Сохранённые статьи</h3>
      <h2 class="section-title info__title">${username}, у вас <span class="info__number">${articlesNumber}</span> сохранённых статей</h2>
      <p class="info__keywords">По ключевым словам: <i class="info__keywords_bold">${this.keywordOne}, ${this.keywordTwo}</i> и <i
        class="info__keywords_bold">${this.keywordsRest} ${this.otherWord}</i>
      </p>
    `)
  }

  _checkKeywordsNumber(keywords) {
    this.keywordOne = keywords[0];
    this.keywordTwo = keywords[1];
    if(keywords.length > 3) {
      this.keywordsRest = keywords.length - 2;
    }
    if(this.keywordsRest === 1 || this.keywordsRest === 21) {
      this.otherWord = 'другому';
    }
    this.otherWord = 'другим';
  }

}