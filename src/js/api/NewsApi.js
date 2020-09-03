export default class NewsApi {
  constructor(options) {
    this.options = options;
    // this.url = this.options.baseUrl;
    this.headers = this.options.headers;
    this.authorization = this.headers.authorization;
    this.contentType = this.headers['Content-Type'];
    this.keywords = this.options.keywords;
  }

  // возвращает список новостей на основе запроса.
  getNews() {
    return fetch(`http://newsapi.org/v2/everything?q=${this.keywords}&from=2020-09-01&to=2020-09-03&language=ru&pageSize=100`, {
      method: 'GET',
      headers: {
        authorization: this.authorization,
      }
    })
      .then(res => {
        if (res.ok) res.json();
        return Promise.reject(`Ошибка: ${res.status}`);
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }
}