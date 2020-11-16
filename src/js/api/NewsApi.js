export default class NewsApi {
  constructor(options) {
    this.options = options;
    this.url = this.options.baseUrl;
    this.dateTo = this.options.dateTo;
    this.dateFrom = this.options.dateFrom;
    this.headers = this.options.headers;
    this.key = this.options.apiKey;
    this.contentType = this.headers['Content-Type'];
  }

  // возвращает список новостей на основе запроса.
  getNews(keywords) {
    return fetch(`${this.url}/news/v2/everything?q=${keywords}&from=${this.dateFrom}&to=${this.dateTo}&language=ru&pageSize=100&apiKey=${this.key}`, {
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
        return data;
      })
      .catch(err => {
        return err;
      })
  }
}