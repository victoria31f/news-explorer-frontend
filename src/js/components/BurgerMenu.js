export default class BurgerMenu {
  constructor() {

  }

  // const burgerMenu = document.querySelector('.header__burger');
// const menu = document.querySelector('.menu');
// const headerContainer = document.querySelector('.header__container');
// const closeIcon = document.querySelector('.menu__close');
// const darkArea = document.querySelector('.header__dark-area');
//

  setListeners(container) {
    this.container = container;
    this.burgerMenu = document.querySelector('.header__burger');
    this.closeIcon = document.querySelector('.menu__close');
    this.burgerMenu.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler = () => {
    console.log('burger clicked');
    this.openCloseBurgerMenu();
    this.closeIcon.addEventListener('click', this.openCloseBurgerMenu.bind(this));
  }

  openCloseBurgerMenu = () => {
    this.menu = document.querySelector('.menu');
    this.darkArea = document.querySelector('.header__dark-area');
    this.menu.classList.toggle('menu_opened');
    this.container.classList.toggle('header__container_menu-opened');
    this.darkArea.classList.toggle('header__dark-area_opened');
    this.burgerMenu.classList.toggle('header__burger_invisible');
    this.closeIcon.classList.toggle('hidden');
    if (screen.width < 767) {
      this.closeIcon.classList.remove('hidden');
    }
  }



// burgerMenu.addEventListener('click', () => {
//   openCloseBurgerMenu();
//   closeIcon.addEventListener('click', openCloseBurgerMenu);
// });

}