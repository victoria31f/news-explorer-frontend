import '../css/articles.css';

import {
  HEADER_COLOR_BLACK,
  HEADER,
  HEADER_ITEM_ACTIVE_CLASS,
  HEADER_ITEM_ARTICLES_ID
} from "./constants/header";
import { INFO_CONTAINER } from "./constants/articles";
import { CARDS_BLOCK, CARDS_CONTAINER, HIDDEN_ELEM_CLASS, SHOW_MORE_BUTTON } from "./constants/cards";

import Header from "./components/Header";
import MainApi from "./api/MainApi";
import Info from "./components/Info";
import NewsCardList from "./components/NewsCardList";
import NewsCard from "./components/NewsCard";


const mainApi = new MainApi({
  baseUrl: 'https://api.explorerofnews.ga',
  headers: {
    'Content-Type': 'application/json',
  }
});

const header = new Header({
  container: HEADER,
  headerColor: HEADER_COLOR_BLACK,
  menuItemActive: HEADER_ITEM_ACTIVE_CLASS,
  currentPageItem: HEADER_ITEM_ARTICLES_ID,
});

const info = new Info({
  container: INFO_CONTAINER,
});


const cardList = new NewsCardList({
  container: CARDS_CONTAINER,
  // createCard: newCard.renderIcon.bind(newCard),
  buttonShowMore: SHOW_MORE_BUTTON,
  cardsBlockClass: CARDS_BLOCK,
  hiddenElemClass: HIDDEN_ELEM_CLASS,
});

const getKeywordsFromArticles = (articles) => {
  let allKeywords = articles.map((item) => {
    return item.keyword;
  });
  let countedKeywords = allKeywords.reduce((allKeys, keyword) => {
    if (keyword in allKeys) {
      allKeys[keyword]++
    }
    else {
      allKeys[keyword] = 1
    }
    return allKeys;
  }, {});
  return Object.keys(countedKeywords).sort((a, b) => {
    return countedKeywords[b] - countedKeywords[a];
  });
}

const headerCallback = () => {
  mainApi.getUserData()
    .then(data => {
      if (data.data) {
        const user = data.data;
        const loggedIn = true;
        header.renderLoggedIn(user.name, () => {
          mainApi.logout()
            .then(() => {
              window.location.replace('./index.html');
            })
        });
        mainApi.getArticles()
          .then(data => {
            const articles = data.filter(card => card.owner === user.id);
            const keywords = getKeywordsFromArticles(articles);
            info.renderInfo(user.name, articles.length, keywords);
            const getCardsArray = () => {
              const cards = [];
              articles.forEach(elem => {
                const card = new NewsCard(elem.image, elem.date, elem.title, elem.text, elem.source, elem.link, loggedIn, mainApi.removeArticle.bind(mainApi), elem.keyword, elem._id).renderIcon();
                cards.push(card);
              })
              return cards;
            }
            cardList.renderCards(getCardsArray());
          })
      } else {
        window.location.replace('./index.html');
      }
    })
}

header.render(headerCallback);
