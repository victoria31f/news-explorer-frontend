!function(e){var n={};function t(p){if(n[p])return n[p].exports;var l=n[p]={i:p,l:!1,exports:{}};return e[p].call(l.exports,l,l.exports,t),l.l=!0,l.exports}t.m=e,t.c=n,t.d=function(e,n,p){t.o(e,n)||Object.defineProperty(e,n,{enumerable:!0,get:p})},t.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},t.t=function(e,n){if(1&n&&(e=t(e)),8&n)return e;if(4&n&&"object"==typeof e&&e&&e.__esModule)return e;var p=Object.create(null);if(t.r(p),Object.defineProperty(p,"default",{enumerable:!0,value:e}),2&n&&"string"!=typeof e)for(var l in e)t.d(p,l,function(n){return e[n]}.bind(null,l));return p},t.n=function(e){var n=e&&e.__esModule?function(){return e.default}:function(){return e};return t.d(n,"a",n),n},t.o=function(e,n){return Object.prototype.hasOwnProperty.call(e,n)},t.p="",t(t.s=0)}([function(e,n,t){"use strict";t.r(n);t(1);var p=document.querySelector("#popup-content"),l=document.querySelector(".popup"),o='\n    <div class="field-not-clickable">\n      <h3 class="popup__title field-not-clickable">Вход</h3>\n      <form class="popup__form field-not-clickable" id="login" name="login">\n        <label for="email" class="popup__label">Email</label>\n        <input type="email" name="email" id="email" required minlength="2" maxlength="30"\n               class="popup__input popup__input_type_email field-not-clickable" placeholder="Введите почту">\n        <span class="popup__error" id="error-email"></span>\n\n        <label for="password" class="popup__label">Пароль</label>\n        <input type="text" name="password" id="password" required mimnlength="8" maxlength="30"\n               class="popup__input popup__input_type_password field-not-clickable" placeholder="Введите пароль">\n        <span class="popup__error" id="error-password"></span>\n\n        <button type="submit"\n                class="popup__button field-not-clickable edit-profile__button_active"\n                id="login-button">Войти</button>\n        <span class="popup__text">или <span class="popup__text_blue popup__signup-button">Зарегистрироваться</span></span>\n      </form>\n    </div>\n',i=document.querySelector(".header__burger"),a=document.querySelector(".menu"),r=document.querySelector(".header__container"),s=document.querySelector(".menu__close"),u=document.querySelector(".header__dark-area"),c=function(){a.classList.toggle("menu_opened"),r.classList.toggle("header__container_menu-opened"),u.classList.toggle("header__dark-area_opened"),i.classList.toggle("header__burger_invisible"),s.classList.toggle("menu__close_visible")};document.querySelector(".button-login").addEventListener("click",(function(){p.insertAdjacentHTML("beforeend",o),l.classList.add("popup_is-opened"),c(),document.querySelector(".popup__signup-button").addEventListener("click",(function(){p.removeChild(p.lastElementChild),p.insertAdjacentHTML("beforeend",'\n    <div class="field-not-clickable">\n      <h3 class="popup__title field-not-clickable">Вход</h3>\n      <form class="popup__form field-not-clickable" id="login" name="login">\n\n        <label for="email" class="popup__label">Email</label>\n        <input type="email" name="email" id="email" required minlength="2" maxlength="30"\n               class="popup__input popup__input_type_email field-not-clickable" placeholder="Введите почту">\n        <span class="popup__error" id="error-email"></span>\n\n        <label for="password" class="popup__label">Пароль</label>\n        <input type="text" name="password" id="password" required mimnlength="8" maxlength="30"\n               class="popup__input popup__input_type_password field-not-clickable" placeholder="Введите пароль">\n        <span class="popup__error" id="error-password"></span>\n\n        <label for="name" class="popup__label">Имя</label>\n        <input type="text" name="name" id="name" required minlength="2" maxlength="30"\n               class="popup__input popup__input_type_name field-not-clickable" placeholder="Введите своё имя">\n        <span class="popup__error" id="error-name"></span>\n\n        <button type="submit"\n                class="popup__button field-not-clickable edit-profile__button_active"\n                id="signup-button">Зарегистрироваться</button>\n        <span class="popup__text">или <span class="popup__text_blue popup__signin-button">Войти</span></span>\n      </form>\n    </div>\n'),l.classList.add("popup_is-opened"),document.querySelector("#signup-button").addEventListener("click",(function(){p.removeChild(p.lastElementChild),p.insertAdjacentHTML("beforeend",'\n  <div class="field-not-clickable">\n    <h3 class="popup__title field-not-clickable">Пользователь успешно зарегистрирован!</h3>\n    <span class="popup__text popup__text_big popup__text_blue popup__signin-button">Выполнить вход</span>\n  </div>\n'),l.classList.add("popup_is-opened")})),document.querySelector(".popup__signin-button").addEventListener("click",(function(){p.removeChild(p.lastElementChild),p.insertAdjacentHTML("beforeend",o),l.classList.add("popup_is-opened")}))}))})),i.addEventListener("click",(function(){c(),s.addEventListener("click",c)}))},function(e,n,t){}]);