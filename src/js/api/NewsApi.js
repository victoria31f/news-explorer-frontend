export default class NewsApi {
  constructor(options) {
    this.options = options;
    // this.url = this.options.baseUrl;
    this.headers = this.options.headers;
    this.key = this.options.apiKey;
    this.contentType = this.headers['Content-Type'];
  }

  // возвращает список новостей на основе запроса.
  getNews(keywords) {
    return fetch(`https://nomoreparties.co/news/v2/everything?q=${keywords}&from=2020-09-01&to=2020-09-03&language=ru&pageSize=100&apiKey=${this.key}`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        return data.articles;
      })
      .catch(err => {
        console.log(err);
      })
  }
}