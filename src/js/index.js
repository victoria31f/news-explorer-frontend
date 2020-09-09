import '../css/main.css';
import {
    loginPopupTemplate,
    signupPopupTemplate,
    SUCCESS_POPUP,
    popupContainer,
    closePopupButton,
    popup,
    closeField,
    signupButton
} from './constants/popupMarkup';
import { CARDS_CONTAINER, SHOW_MORE_BUTTON} from "./constants/cards";

import Popup from "./components/Popup";
import NewsApi from "./api/NewsApi";
import Form from "./components/Form";
import MainApi from "./api/MainApi";
import SearchForm from "./components/SearchForm";
import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";

const loginButton = document.querySelector('.button-login');
// const loginFormElem = document.forms['login'];
// const signupFormElem = document.forms['signup'];

const newsApi = new NewsApi({
  apiKey: 'c6e72a1aa4164fd0b73957a7b88b309f',
  dateTo: new Date().toISOString().split('T')[0],
  dateFrom: () => {
    let d = new Date();
    d.setDate(d.getDate() - 7);
    return d.toISOString().split('T')[0];
  },
  headers: {
    'Content-Type': 'application/json',
  }
})

const mainApi = new MainApi({
  baseUrl: 'https://api.explorerofnews.ga',
  headers: {
    'Content-Type': 'application/json',
  }
});

const successPopup = () => {
  new Popup(popup, popupContainer, SUCCESS_POPUP, closePopupButton, closeField, loginPopup).open();
}

const signupPopup = () => {
  const popupSignup = new Popup(popup, popupContainer, signupPopupTemplate, closePopupButton, closeField, loginPopup);
  popupSignup.open();
  const signupForm = new Form(document.forms['signup'], 'popup__button_active');
  signupForm.setListeners(() => {
    mainApi.signup(...signupForm.getInfo())
      .then(data => {
        if(data.data) {
          popupSignup.close();
          successPopup();
          return console.log('Signed up', data);
        }
        signupForm.setServerError(data);
      })
  });
}


const loginPopup = () => {
  const popupLogin = new Popup(popup, popupContainer, loginPopupTemplate, closePopupButton, closeField, signupPopup);
  popupLogin.open();
  // new Form(document.forms['login'], 'popup__button_active').setListeners(mainApi.signin.bind(mainApi));
  const loginForm = new Form(document.forms['login'], 'popup__button_active');
  loginForm.setListeners(() => {
    mainApi.signin(...loginForm.getInfo())
      .then(data => {
        if(data.data) {
          popupLogin.close();
          return console.log('Logged in', data);
        }
        loginForm.setServerError(data);
      })
  });
}

loginButton.addEventListener('click', loginPopup);

const newCard = new NewsCard();
const cardList = new NewsCardList(CARDS_CONTAINER, newCard.renderIcon.bind(newCard), SHOW_MORE_BUTTON);

new SearchForm(document.forms['search'], 'search-bar__button_active').setEventListeners(
  newsApi.getNews.bind(newsApi),
  cardList.renderResults.bind(cardList)
);



//
// signupButton.addEventListener('click', () => {
//   console.log('signup clicked');
//   signupPopup.open();
// })


// const popup = document.querySelector('.popup');
//
//
// const burgerMenu = document.querySelector('.header__burger');
// const menu = document.querySelector('.menu');
// const headerContainer = document.querySelector('.header__container');
// const closeIcon = document.querySelector('.menu__close');
// const darkArea = document.querySelector('.header__dark-area');
//
// const openCloseBurgerMenu = () => {
//   menu.classList.toggle('menu_opened');
//   headerContainer.classList.toggle('header__container_menu-opened');
//   darkArea.classList.toggle('header__dark-area_opened');
//   burgerMenu.classList.toggle('header__burger_invisible');
//   if (screen.width < 767) {
//     closeIcon.classList.toggle('menu__close_visible');
//   }
// }
//
//
// document.querySelector('.button-login').addEventListener('click', () => {
//   // if (container.lastElementChild.className !== 'popup__close') {
//   //   container.removeChild(container.lastElementChild);
//   // }
//   container.insertAdjacentHTML('beforeend', loginPopupTemplate);
//   popup.classList.add('popup_is-opened');
//   openCloseBurgerMenu();
//
//   document.querySelector('.popup__signup-button').addEventListener('click', () => {
//     container.removeChild(container.lastElementChild);
//     container.insertAdjacentHTML('beforeend', signupPopupTemplate);
//     popup.classList.add('popup_is-opened');
//
//     document.querySelector('#signup-button').addEventListener('click', () => {
//       container.removeChild(container.lastElementChild);
//       container.insertAdjacentHTML('beforeend', successPopupTemplate);
//       popup.classList.add('popup_is-opened');
//     });
//
//     document.querySelector('.popup__signin-button').addEventListener('click', () => {
//       container.removeChild(container.lastElementChild);
//       container.insertAdjacentHTML('beforeend', loginPopupTemplate);
//       popup.classList.add('popup_is-opened');
//     });
//   });
// });
//
//
//
// burgerMenu.addEventListener('click', () => {
//   openCloseBurgerMenu();
//   closeIcon.addEventListener('click', openCloseBurgerMenu);
// });


