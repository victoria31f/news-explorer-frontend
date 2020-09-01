const loginPopupTemplate = `
    <div class="field-not-clickable">
      <h3 class="popup__title field-not-clickable">Вход</h3>
      <form class="popup__form field-not-clickable" id="login" name="login">
        <label for="email" class="popup__label">Email</label>
        <input type="email" name="email" id="email" required minlength="2" maxlength="30"
               class="popup__input popup__input_type_email field-not-clickable" placeholder="Введите почту">
        <span class="popup__error" id="error-email"></span>

        <label for="password" class="popup__label">Пароль</label>
        <input type="text" name="password" id="password" required mimnlength="8" maxlength="30"
               class="popup__input popup__input_type_password field-not-clickable" placeholder="Введите пароль">
        <span class="popup__error" id="error-password"></span>

        <button type="submit"
                class="popup__button field-not-clickable edit-profile__button_active"
                id="login-button">Войти</button>
        <span class="popup__text">или <span class="popup__text_blue popup__signup-button">Зарегистрироваться</span></span>
      </form>
    </div>
  `

const signupPopupTemplate = `
    <div class="field-not-clickable">
      <h3 class="popup__title field-not-clickable">Вход</h3>
      <form class="popup__form field-not-clickable" id="login" name="login">

        <label for="email" class="popup__label">Email</label>
        <input type="email" name="email" id="email" required minlength="2" maxlength="30"
               class="popup__input popup__input_type_email field-not-clickable" placeholder="Введите почту">
        <span class="popup__error" id="error-email"></span>

        <label for="password" class="popup__label">Пароль</label>
        <input type="text" name="password" id="password" required mimnlength="8" maxlength="30"
               class="popup__input popup__input_type_password field-not-clickable" placeholder="Введите пароль">
        <span class="popup__error" id="error-password"></span>

        <label for="name" class="popup__label">Имя</label>
        <input type="text" name="name" id="name" required minlength="2" maxlength="30"
               class="popup__input popup__input_type_name field-not-clickable" placeholder="Введите своё имя">
        <span class="popup__error" id="error-name"></span>

        <button type="submit"
                class="popup__button field-not-clickable edit-profile__button_active"
                id="signup-button">Зарегистрироваться</button>
        <span class="popup__text">или <span class="popup__text_blue popup__signin-button">Войти</span></span>
      </form>
    </div>
  `

const successPopupTemplate = `
  <div class="field-not-clickable">
    <h3 class="popup__title field-not-clickable">Пользователь успешно зарегистрирован!</h3>
    <span class="popup__text popup__text_big popup__text_blue popup__signin-button">Выполнить вход</span>
  </div>
`

const popupContainer = document.querySelector('#popup-content');

const closePopupButton = document.querySelector('.popup__close');

const popup = document.querySelector('.popup');

export { loginPopupTemplate, signupPopupTemplate, successPopupTemplate, popupContainer, closePopupButton, popup };