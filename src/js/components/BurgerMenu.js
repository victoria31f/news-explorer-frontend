export default class BurgerMenu {
  constructor(headerColor) {
    this.headerColor = headerColor;
  }

  setListeners() {
    this.container = document.querySelector('.header__container');
    this.burgerMenu = document.querySelector('.header__burger');
    this.closeIcon = document.querySelector('.menu__close');
    this.burgerMenu.addEventListener('click', this._clickHandler.bind(this));
  }

  _clickHandler = () => {
    this.openCloseBurgerMenu();
    this.handler = this.closeBurgerMenu.bind(this);
    this.closeIcon.addEventListener('click', this.handler);
    this.darkArea.addEventListener('click', this.handler);

  }


  openCloseBurgerMenu = () => {
    this.menu = document.querySelector('.menu');
    this.darkArea = document.querySelector('.header__dark-area');
    this.menu.classList.add(`menu_opened`);
    this.menu.classList.add(`menu_opened-${this.headerColor}`);
    this.container.classList.add(`header__container_${this.headerColor}`);
    this.darkArea.classList.add('header__dark-area_opened');
    this.burgerMenu.classList.add('header__burger_invisible');
    this.closeIcon.classList.remove('hidden');
    if (screen.width < 767) {
      this.closeIcon.classList.remove('hidden');
    }
    this.closeIcon.removeEventListener('click', this.handler);
    this.darkArea.removeEventListener('click', this.handler);

  }

  closeBurgerMenu = () => {
    this.menu = document.querySelector('.menu');
    this.darkArea = document.querySelector('.header__dark-area');
    this.menu.classList.remove(`menu_opened`);
    this.menu.classList.remove(`menu_opened-${this.headerColor}`);
    this.container.classList.remove(`header__container_${this.headerColor}`);
    this.darkArea.classList.remove('header__dark-area_opened');
    this.burgerMenu.classList.remove('header__burger_invisible');
    this.closeIcon.classList.add('hidden');
    if (screen.width < 767) {
      this.closeIcon.classList.add('hidden');
    }
    this.closeIcon.removeEventListener('click', this.handler);
    this.darkArea.removeEventListener('click', this.handler);

  }

}