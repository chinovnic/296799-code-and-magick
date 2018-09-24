'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var WIZARDS_QUANTITY = 4;
var wizards = [];
var setupOpen = document.querySelector('.setup-open');
var popupSetup = document.querySelector('.setup');
var setupClose = popupSetup.querySelector('.setup-close');
var userNameInput = popupSetup.querySelector('.setup-user-name');
// var submitSetup = popupSetup.querySelector('.setup-submit');
var onPopupEscPress = function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup();
  }
};

var openPopup = function (popup) {
  popup.classList.remove('hidden');
  window.addEventListener('keydown', onPopupEscPress);
};
var closePopup = function (popup) {
  popup.classList.add('hidden');
  window.removeEventListener('keydown', onPopupEscPress);
};

var checkInputValidity = function (inputName) {
  inputName.addEventListener('invalid', function () {
    if (inputName.validity.tooShort) {
      inputName.setCustomValidity('Имя должно состоять минимум из 2-х символов. Лень кнопки нвжимать?');
    } else if (inputName.validity.tooLong) {
      inputName.setCustomValidity('Имя не должно превышать 25-ти символов. Святые угодники, ну и фантазия..');
    } else if (inputName.validity.valueMissing) {
      inputName.setCustomValidity('Обязательное поле');
    } else {
      inputName.setCustomValidity('');
    }
  });
};
checkInputValidity(userNameInput);

// setuPopup.addEventListener('click', function (evt) {
//   evt.preventDefault();
//
// });

setupOpen.addEventListener('click', function (evt) {
  evt.preventDefault();
  openPopup(popupSetup);
});
setupOpen.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    openPopup(popupSetup);
  }
});
setupClose.addEventListener('click', function (evt) {
  evt.preventDefault();
  closePopup(popupSetup);
});
window.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ESC_KEYCODE) {
    closePopup(popupSetup);
  }
});
setupClose.addEventListener('keydown', function (evt) {
  if (evt.keyCode === ENTER_KEYCODE) {
    closePopup(popupSetup);
  }
});
// userNameInput.addEventListener('focus', function () {
//   window.removeEventListener('keydown', onPopupEscPress);
// });
var getRandom = function (arrLength) {
  return Math.floor(Math.random() * arrLength);
};
var getFullName = function () {
  return WIZARD_NAMES[getRandom(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length)];
};
var getCoatColor = function () {
  return COAT_COLORS[getRandom(COAT_COLORS.length)];
};
var getEyesColor = function () {
  return EYES_COLORS[getRandom(EYES_COLORS.length)];
};

for (var j = 0; j < WIZARDS_QUANTITY; j++) {
  wizards[j] = {
    name: getFullName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  };
}

document.querySelector('.setup').classList.remove('hidden');

var renderWizard = function (currentWizard) {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = currentWizard.name;
  wizardElement.querySelector('.wizard-coat').style.fill = currentWizard.coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = currentWizard.eyesColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
