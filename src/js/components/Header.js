import BaseComponent from "./BaseComponent";

export default class Header extends BaseComponent {
  constructor(props) {
    super();
    this.container = props.container;
    this.headerColor = props.headerColor;
    this.loginCallback = props.loginCallback;
    this.menuItemActive = props.menuItemActive;
    this.currentPageItem = props.currentPageItem;
  }

  renderLoggedIn(username, logoutApi) {
    this.container.insertAdjacentHTML('beforeend', `
        <div class="header__container">
          <a href="./" class="logo header__logo link">NewsExplorer</a>
          <img src="./images/burger_${this.headerColor}.svg" alt="menu icon" class="header__burger">
          <img src="./images/close_${this.headerColor}.svg" alt="close icon" class="menu__close hidden">
          <div class="header__dark-area"></div>
          <nav class="menu menu_${this.headerColor}">
            <a href="./" id="homepage" class="menu__item menu__item_${this.headerColor} link">Главная</a>
            <a href="./articles.html" id="articles" class="menu__item menu__item_${this.headerColor} link">Сохранённые статьи</a>
            <button class="menu__item menu__item_${this.headerColor} button-logout">
              <span class="button-logout__text">${username}</span>
              <img src="./images/logout_${this.headerColor}.svg" alt="logout icon"
                   class="menu__icon button-logout__image">
            </button>
          </nav>
        </div>`
    );
    this.container.querySelector(`#${this.currentPageItem}`).classList.add(this.menuItemActive);
    this.setListenerLogout(logoutApi);
  }

  setListenerLogout(logoutApi) {
    this.container.querySelector('.button-logout').addEventListener('click', () => {
      logoutApi();
    })
  }

  renderLoggedOut() {
    this.container.insertAdjacentHTML('beforeend', `
        <div class="header__container">
          <a href="./" class="logo header__logo link">NewsExplorer</a>
          <img src="./images/burger_${this.headerColor}.svg" alt="menu icon" class="header__burger">
          <img src="./images/close_${this.headerColor}.svg" alt="close icon" class="menu__close hidden">
          <div class="header__dark-area"></div>
          <nav class="menu">
            <a href="./" id="homepage" class="menu__item menu__item_active link">Главная</a>
            <button class="menu__item button-logout">
              <span class="button-logout__text button-login">Авторизоваться</span>
            </button>
          </nav>
        </div>`
    );
    document.querySelector('.button-login').addEventListener('click', this.loginCallback);
  }

  render(callback) {
    this.container.removeChild(this.container.lastElementChild);
    this.container.classList.add(`header_${this.headerColor}`);
    callback();
  }


}