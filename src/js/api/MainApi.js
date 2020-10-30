export default class MainApi {
  constructor(options) {
    this.options = options;
    this.url = this.options.baseUrl;
    this.headers = this.options.headers;
    this.contentType = this.headers['Content-Type'];
  }

  signup(email, password, name) {
    return fetch(`${this.url}/signup`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({ email, password, name })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(response => Promise.reject(`Ошибка: ${response.message}`));
      })
      .catch(err => {
        return err;
      })
  }

  signin(email, password) {
    return fetch(`${this.url}/signin`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': this.contentType,
      },
      body: JSON.stringify({ email, password })
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(response => Promise.reject(`Ошибка: ${response.message}`));
      })
      .catch(err => {
        return err;
      })
  }

  logout() {
    return fetch(`${this.url}/logout`, {
      method: 'POST',
      credentials: 'include',
    })
      .then(res => {
        if (res.ok) {
          return res.json();
        }
        return res.json().then(response => Promise.reject(`Ошибка: ${response.message}`));
      })
      .catch(err => {
        return err;
      })
  }

  getUserData() {
    return fetch(`${this.url}/users/me`, {
      method: 'GET',
      credentials: 'include',
      headers: {
        'Content-Type': this.contentType,
      }
    })
      .then(res => {
        if (res.ok) {
          return res.json()
        }
        return res.json().then(response => Promise.reject(`Ошибка: ${response.message}`));
      })
      .catch(err => {
        return err;
      })
  }

  getArticles() {
    return fetch(`${this.url}/articles`, {
      method: 'GET',
      credentials: 'include',
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
        return data.data;
      })
      .catch(err => {
        return err;
      })
  }

  createArticle(keyword, title, text, date, source, link, image) {
    return fetch(`${this.url}/articles`, {
      method: 'POST',
      credentials: 'include',
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
        return data.data;
      })
      .catch(err => {
        return err;
      })
  }

  removeArticle(articleId) {
    return fetch(`${this.url}/articles/${articleId}`, {
      method: 'DELETE',
      credentials: 'include',
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
        return err;
      })
  }

}