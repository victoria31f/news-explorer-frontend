export default class MainApi {
  constructor(options) {
    this.url = this.options.baseUrl;
    this.headers = this.options.headers;
    this.contentType = this.headers['Content-Type'];
  }

  signup(email, password, name) {
    fetch(`${this.url}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({ email, password, name })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.error}`)
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  signin(email, password) {
    fetch(`${this.url}/signin`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.error}`)
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  getUserData() {
    fetch(`${this.url}/users/me`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.error}`)
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  getArticles() {
    fetch(`${this.url}/articles`, {
      method: 'GET',
      headers: {
        'Content-Type': this.contentType,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.error}`)
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  createArticle(keyword, title, text, date, source, link, image) {
    fetch(`${this.url}/articles`, {
      method: 'POST',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({ keyword, title, text, date, source, link, image }),
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.error}`)
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }

  removeArticle(articleId) {
    fetch(`${this.url}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': this.contentType,
      },
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return Promise.reject(`Ошибка: ${res.error}`)
      })
      .then(data => {
        return data;
      })
      .catch(err => {
        console.log(err);
      })
  }

}