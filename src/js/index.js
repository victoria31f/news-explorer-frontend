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
import { HEADER, HEADER_COLOR_WHITE, HEADER_ITEM_ACTIVE_CLASS, HEADER_ITEM_HOMEPAGE_ID, HEADER_CONTAINER, HEADER_BG_COLOR_BLACK } from "./constants/header";
import { getTodayDate, getSevenDaysBackDate, convertDate } from "./utils/utils";

import Popup from "./components/Popup";
import NewsApi from "./api/NewsApi";
import Form from "./components/Form";
import MainApi from "./api/MainApi";
import SearchForm from "./components/SearchForm";
import NewsCard from "./components/NewsCard";
import NewsCardList from "./components/NewsCardList";
import Header from "./components/Header";
import BurgerMenu from "./components/BurgerMenu";


const mainApi = new MainApi({
  baseUrl: 'https://api.explorerofnews.ga',
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

const burgerMenu = new BurgerMenu(HEADER_BG_COLOR_BLACK);


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
  const loginForm = new Form(document.forms['login'], 'popup__button_active');
  loginForm.setListeners(() => {
    mainApi.signin(...loginForm.getInfo())
      .then(data => {
        if(data.data) {
          popupLogin.close();
          header.render(headerCallback);
          cardList.removeCardsBlock();
          return console.log('Logged in', data);
        }
        loginForm.setServerError(data);
      })
  });
}

const header = new Header({
  container: HEADER,
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
          mainApi.logout()
            .then(() => {
              cardList.removeCardsBlock();
              header.render(headerCallback);
            })
        });
      } else {
        header.renderLoggedOut();
      }
      burgerMenu.setListeners(HEADER_CONTAINER);
    })
}

header.render(headerCallback);


const cardList = new NewsCardList({
  container: CARDS_CONTAINER,
  buttonShowMore: SHOW_MORE_BUTTON,
  cardsBlockClass: CARDS_BLOCK,
  hiddenElemClass: HIDDEN_ELEM_CLASS,
  loaderBlock: LOADER_BLOCK,
  notFoundBlock: NOT_FOUND_BLOCK,
  loginPopupCallback: loginPopup,
})

const searchForm = new SearchForm(document.forms['search'], 'search-bar__button_active');
searchForm.setEventListeners((e) => {
  e.preventDefault();
  if (searchForm._validateInput()) {
    searchForm.getInfo();
    const keywords = searchForm.options.join();
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
            const getCardsArray = (loggedIn) => {
              const cards = [];
              articles.forEach(elem => {
                const card = new NewsCard(elem.urlToImage, convertDate(elem.publishedAt), elem.title, elem.description, elem.source.name, elem.url, loggedIn, mainApi.createArticle.bind(mainApi), keywords, null, loginPopup).renderIcon();
                cards.push(card);
              })
              return cards;
            }

            if (data.data) {
              const loggedIn = true;
              cardList.renderCards(getCardsArray(loggedIn));

            } else {
              const loggedIn = false;
              cardList.renderCards(getCardsArray(loggedIn));
            }
          });
      });
    searchForm.options.splice(0);
    searchForm._clear();

  }

});

