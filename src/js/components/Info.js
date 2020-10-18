export default class Info {
  constructor(props) {
    this.container = props.container;
  }

  renderInfo(username, articlesNumber, keywords) {
    this.container.insertAdjacentHTML('beforeend', `
      <h3 class="info__subtitle">Сохранённые статьи</h3>
      <h2 class="section-title info__title">${username}, у вас <span class="info__number">${articlesNumber}</span> сохранённых статей</h2>
      <p class="info__keywords">По ключевым словам: <i class="info__keywords_bold">${keywords}</i> и <i
        class="info__keywords_bold">2 другим</i>
      </p>
    `)
  }
}