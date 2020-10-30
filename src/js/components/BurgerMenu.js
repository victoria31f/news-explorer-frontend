export default class BurgerMenu {
  constructor() {

  }

  setListeners(container) {
    this.container = document.querySelector('.header__container');
    this.burgerMenu = document.querySelector('.header__burger');
    this.closeIcon = document.querySelector('.menu__close');
    this.burgerMenu.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler = () => {
    console.log('burger clicked');
    this.openCloseBurgerMenu();
    this.handler = this.openCloseBurgerMenu.bind(this);
    this.closeIcon.addEventListener('click', this.handler);
    this.darkArea.addEventListener('click', this.handler);

  }

  _boundClickHandler = () => {
    this.openCloseBurgerMenu.bind(this);
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
    this.closeIcon.removeEventListener('click', this.handler);
    this.darkArea.removeEventListener('click', this.handler);

  }



// burgerMenu.addEventListener('click', () => {
//   openCloseBurgerMenu();
//   closeIcon.addEventListener('click', openCloseBurgerMenu);
// });

}