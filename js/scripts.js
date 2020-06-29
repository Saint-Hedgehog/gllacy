// Модальное окно обратной связи//

var feedbackBtn = document.querySelector(".feedback-button");
var overlay = document.querySelector(".modal-overlay");
var modalFeedback = document.querySelector(".modal-feedback");
var closeFeedback = modalFeedback.querySelector(".modal-close");
var formFeedback = modalFeedback.querySelector("form");
var nameFeedback = modalFeedback.querySelector("[name=name]");
var emailFeedback = modalFeedback.querySelector("[name=email]");
var descriptionFeedback = modalFeedback.querySelector("[name=description]");

//Проверка локального хранилища//

var isStorageSupport = true;
var nameStorage = "";
var emailStorage = "";

try {
  nameStorage = localStorage.getItem("name");
  emailStorage = localStorage.getItem("email");
} catch(err) {
  isStorageSupport = false;
}

//Открытие модального окна и добавления overlay//

feedbackBtn.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFeedback.classList.remove("modal-out");
  overlay.style.display = "block";
  modalFeedback.classList.add("modal-show");
  nameFeedback.focus();
  if (nameStorage) {
    nameFeedback.value = nameStorage;
    emailFeedback.focus();
  }
  if (emailStorage) {
    emailFeedback.value = emailStorage;
    descriptionFeedback.focus();
  }
});

//Закрытие модального окна//

closeFeedback.addEventListener("click", function(evt) {
  evt.preventDefault();
  modalFeedback.classList.add("modal-out");
  setTimeout(function() {
    modalFeedback.classList.remove("modal-show");
    modalFeedback.classList.remove("modal-error");
    overlay.style.display = "";
  }, 600);
});

//Проверка заполнения полей формы//

formFeedback.addEventListener("submit", function(evt) {
  if (!nameFeedback.value || !emailFeedback.value || !descriptionFeedback.value) {
    evt.preventDefault();
    modalFeedback.classList.remove("modal-error");
    modalFeedback.offsetWidth = modalFeedback.offsetWidth;
    modalFeedback.classList.add("modal-error");
  } else {
    if (isStorageSupport) {
      localStorage.setItem("name", nameFeedback.value);
      localStorage.setItem("email", emailFeedback.value);
    }
  }
});

//Закрытие модального окна клавишой ESC//

window.addEventListener("keydown", function(evt) {
  if (evt.keyCode === 27) {
    if (modalFeedback.classList.contains("modal-show")) {
      evt.preventDefault();
      modalFeedback.classList.add("modal-out");
      setTimeout(function() {
        modalFeedback.classList.remove("modal-show");
        modalFeedback.classList.remove("modal-error");
        overlay.style.display = "";
      }, 600);
    }
  }
});
