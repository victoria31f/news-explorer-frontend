import '../css/main.css';

const container = document.querySelector('.popup');
const login = `
  <div class="field-not-clickable popup__content" id="popup-content">
    <img src="../images/close.svg" alt="" class="popup__close new-card__close">

    <div class="field-not-clickable">
      <h3 class="popup__title field-not-clickable">Вход</h3>
      <form class="popup__form field-not-clickable" novalidate="" id="login" name="login">
        <span class="popup__field">Email</span>
        <input type="text" name="email" id="email" required=""
               class="popup__input popup__input_type_username field-not-clickable" placeholder="Введите почту">
        <span class="error-message" id="error-username"></span>
        <span class="popup__field">Password</span>
        <input type="text" name="password" id="password" required=""
               class="popup__input popup__input_type_about field-not-clickable" placeholder="Введите пароль">
        <span class="error-message" id="error-about"></span>
        <button type=""
                class="popup__button edit-profile__button field-not-clickable edit-profile__button_active"
                id="edit-profile__button">Войти</button>
        <span>или <span class="signup-button">Зарегистрироваться</span></span>
      </form>
    </div>
</div>
`

const signup = `
  <div class="field-not-clickable popup__content" id="popup-content">
    <img src="../images/close.svg" alt="" class="popup__close new-card__close">

    <div class="field-not-clickable">
      <h3 class="popup__title field-not-clickable">Регистрация</h3>
      <form class="popup__form field-not-clickable" novalidate="" id="login" name="login">
        <span class="popup__field">Email</span>
        <input type="text" name="email" id="email" required=""
               class="popup__input popup__input_type_username field-not-clickable" placeholder="Введите почту">
        <span class="error-message" id="error-username"></span>
        <span class="popup__field">Password</span>
        <input type="text" name="password" id="password" required=""
               class="popup__input popup__input_type_about field-not-clickable" placeholder="Введите пароль">
        <span class="error-message" id="error-about"></span>
        <button type=""
                class="popup__button edit-profile__button field-not-clickable edit-profile__button_active"
                id="edit-profile__button">Войти</button>
        <span>или <span class="signup-button">Зарегистрироваться</span></span>
      </form>
    </div>
</div>
`

document.querySelector('.button-login').addEventListener('click', () => {
  container.insertAdjacentHTML('beforeend', login);
  container.classList.add('popup_is-opened');

  document.querySelector('.signup-button').addEventListener('click', () => {
    container.removeChild(container.lastElementChild);
    container.insertAdjacentHTML('beforeend', signup);
    container.classList.add('popup_is-opened');
  });
});

