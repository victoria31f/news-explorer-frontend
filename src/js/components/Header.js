export default class Header {
  constructor(props) {
    this.container = props.container;
    this.headerColor = props.headerColor;
    this.isLoggedIn = props.isLoggedIn;
    this.userName = props.userName;
    this.loginCallback = props.loginCallback;
  }

  renderLoggedIn(username) {
    this.container.insertAdjacentHTML('beforeend', `
        <div class="header__container">
          <a href="./" class="logo header__logo link">NewsExplorer</a>
          <img src="../images/burger_black.svg" alt="menu icon" class="header__burger">
          <img src="../images/close_white.svg" alt="close icon" class="menu__close">
          <div class="header__dark-area">
            <nav class="menu">
              <a href="./" class="menu__item link">Главная</a>
              <a href="./articles.html" class="menu__item menu__item_active link">Сохранённые статьи</a>
              <button class="menu__item button-logout">
                <span class="button-logout__text">${username}</span>
                <img src="../images/logout_${this.headerColor}.svg" alt="logout icon"
                     class="menu__icon button-logout__image">
              </button>
            </nav>
          </div>
        </div>`
    )
  }

  renderLoggedOut() {
    this.container.insertAdjacentHTML('beforeend', `
        <div class="header__container">
          <a href="./" class="logo header__logo link">NewsExplorer</a>
          <img src="../images/burger.svg" alt="menu icon" class="header__burger">
          <img src="../images/close.svg" alt="close icon" class="menu__close">
          <div class="header__dark-area">
            <nav class="menu">
              <a href="./" class="menu__item menu__item_active link">Главная</a>
              <button class="menu__item button-logout">
                <span class="button-logout__text button-login">Авторизоваться</span>
              </button>
            </nav>
          </div>
        </div>`
    );
    document.querySelector('.button-login').addEventListener('click', this.loginCallback);
  }

  render(callback) {
    this.container.removeChild(this.container.lastChild);
    this.container.classList.add(`header_${this.headerColor}`);
    callback();
  }


}