export default class Header {
  constructor(props) {
    this.container = props.container;
    this.headerClass = props.headerColor;
    this.isLoggedIn = props.isLoggedIn;
    this.userName = props.userName;
  }

  render() {
    this.container.classList.add(this.headerClass);
    if(this.isLoggedIn) {
      this.container.insertAdjacentHTML('beforeend', `
        <div class="header__container">
          <a href="./" class="logo logo_black header__logo link">NewsExplorer</a>
          <img src="<%=require('../images/header/burger_black.svg').default%>" alt="menu icon" class="header__burger">
          <img src="<%=require('../images/close_white.svg').default%>" alt="close icon" class="menu__close">
          <div class="header__dark-area">
            <nav class="menu">
              <a href="./" class="menu__item menu__item_black link">Главная</a>
              <a href="./articles.html" class="menu__item menu__item_black menu__item_active link">Сохранённые статьи</a>
              <button class="menu__item menu__item_black button-logout">
                <span class="button-logout__text">${this.userName}</span>
                <img src="<%=require('../images/header/logout_black.svg').default%>" alt="logout icon"
                     class="menu__icon button-logout__image">
              </button>
            </nav>
          </div>
        </div>
      `)
    } else {
      this.container.insertAdjacentHTML('beforeend', `
        <div class="header__container">
          <a href="./" class="logo header__logo link">NewsExplorer</a>
          <img src="<%=require('../images/header/burger.svg').default%>" alt="menu icon" class="header__burger">
          <img src="<%=require('../images/close.svg').default%>" alt="close icon" class="menu__close">
          <div class="header__dark-area">
            <nav class="menu">
              <a href="./" class="menu__item menu__item_active link">Главная</a>
              <button class="menu__item button-logout">
                <span class="button-logout__text button-login">Авторизоваться</span>
              </button>
            </nav>
          </div>
        </div>
      `)
    }
  }


}