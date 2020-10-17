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
import { NEWSAPI_DOMAIN, API_KEY_NEWSAPI } from "./constants/api";
import { CARDS_CONTAINER, SHOW_MORE_BUTTON, HIDDEN_ELEM_CLASS, CARDS_BLOCK, LOADER_BLOCK, NOT_FOUND_BLOCK } from "./constants/cards";
import { HEADER_CONTAINER, HEADER_COLOR_BLACK, HEADER_COLOR_WHITE, HEADER_ITEM_ACTIVE_CLASS, HEADER_ITEM_HOMEPAGE_ID} from "./constants/header";
import { getTodayDate, getSevenDaysBackDate } from "./utils/utils";

import Popup from "./components/Popup";
import NewsApi from "./api/NewsApi";
import Form from "./components/Form";
import MainApi from "./api/MainApi";
import SearchForm from "./components/SearchForm";
import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";
import Header from "./components/Header";



const mainApi = new MainApi({
  baseUrl: 'https://api.explorerofnews.ga',
  // baseUrl: 'http://localhost:3000',
  headers: {
    'Content-Type': 'application/json',
  }
});


const newsApi = new NewsApi({
  baseUrl: NEWSAPI_DOMAIN,
  apiKey: API_KEY_NEWSAPI,
  dateTo: getTodayDate(),
  dateFrom: getSevenDaysBackDate(),
  headers: {
    'Content-Type': 'application/json',
  }
})


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
          header.render(headerCallback);
          return console.log('Logged in', data);
        }
        loginForm.setServerError(data);
      })
  });
}

const header = new Header({
  container: HEADER_CONTAINER,
  headerColor: HEADER_COLOR_WHITE,
  loginCallback: loginPopup,
  menuItemActive: HEADER_ITEM_ACTIVE_CLASS,
  currentPageItem: HEADER_ITEM_HOMEPAGE_ID,
});

const headerCallback = () => {
  mainApi.getUserData()
    .then(data => {
      if (data.data) {
        const user = data.data;
        header.renderLoggedIn(user.name, () => {
          mainApi.logout();
          header.render(headerCallback);
        });
      } else {
        header.renderLoggedOut();
      }
    })
}

header.render(headerCallback);


// const loginButton = document.querySelector('.button-login');

// loginButton.addEventListener('click', loginPopup);

const newCard = new NewsCard(loginPopup);
const cardList = new NewsCardList( CARDS_CONTAINER, newCard.renderIcon.bind(newCard), SHOW_MORE_BUTTON, CARDS_BLOCK, HIDDEN_ELEM_CLASS, LOADER_BLOCK, NOT_FOUND_BLOCK, loginPopup );

const searchForm = new SearchForm(document.forms['search'], 'search-bar__button_active');
searchForm.setEventListeners((e) => {
  e.preventDefault();
  if (searchForm._validateInput()) {
    searchForm.getInfo();
    const keywords = searchForm.options.join();
    // cardList.removeAllCards();
    cardList.renderLoader();
    newsApi.getNews(keywords)
      .then(data => {
        if (!data.articles) {
          return console.log(data);
        }
        if (data.articles.length === 0) {
          cardList.renderNotFound();
          return;
        }
        const articles = data.articles;
        mainApi.getUserData()
          .then(data => {
            if (data.data) {
              cardList.renderResults(keywords, articles, true, mainApi.createArticle.bind(mainApi));
              // newCard.setListenerLoggedOut();
            } else {
              cardList.renderResults(keywords, articles, false);
              // newCard.setListenerLoggedOut();
            }
          });
      });
    searchForm.options.splice(0);
    searchForm._clear();

  }

});



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
// burgerMenu.addEventListener('click', () => {
//   openCloseBurgerMenu();
//   closeIcon.addEventListener('click', openCloseBurgerMenu);
// });


