'use strict';
var ESC_KEYCODE = 27;
var ENTER_KEYCODE = 13;
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var FIREBALL_COLORS = ['#ee4830', '#30a8ee', '#5ce6c0', '#e848d5', '#e6e848'];
var WIZARDS_QUANTITY = 4;
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');
var wizards = [];
var setupOpen = document.querySelector('.setup-open');
var popupSetup = document.querySelector('.setup');
var userNameInput = popupSetup.querySelector('.setup-user-name');
// var wiazardAppearance = popupSetup.querySelector('.setup-wizard-appearance');
var wizardCoat = popupSetup.querySelector('.wizard-coat');
var wizardEyes = popupSetup.querySelector('.wizard-eyes');
var fireball = popupSetup.querySelector('.setup-fireball-wrap');

var getRandom = function (arrLength) {
  return Math.floor(Math.random() * arrLength);
};
var getFullName = function () {
  return WIZARD_NAMES[getRandom(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length)];
};
// получаем цвет чего бы то ни было из массива цветов чего бы то ни было
var getColor = function (colors) {
  return colors[getRandom(colors.length)];
};

var openPopup = function (popup) {
  popup.classList.remove('hidden');
  window.addEventListener('keydown');
};

var closePopup = function (popup) {
  popup.classList.add('hidden');
  window.removeEventListener('keydown');
};

// единый обработчик клика на разные задачи в окне настоек
popupSetup.onclick = function (event) {
  var target = event.target;
  if (target.className === 'setup-close') {
    closePopup(popupSetup);
  }

  if (target.className === 'setup-fireball') {
    var currentFireBallColor = getColor(FIREBALL_COLORS);
    fireball.style.background = currentFireBallColor;
    fireball.querySelector('input').value = currentFireBallColor;
  }

  if (target === wizardCoat.childNodes) {
    var currentCoatColor = getColor(COAT_COLORS);
    while (target !== popupSetup) {
      if (target === wizardCoat) {
        closePopup(popupSetup);
        // wizardCoat.fill = currentCoatColor;
        return;
      }
      target = target.parentNode;
    }
  }
};

// console.log(getColor(FIREBALL_COLORS));
// обработчик всплывающего клика
// popupSetup.onclick = function (event) {
//   var target = event.target;
//   while (target !== popupSetup) {
//     if (target.className === 'wizard-coat') {
//       return;
//     }
//     target = target.parentNode;
//   }
//   closePopup(popupSetup);
// };


// единый обработчик нажатия клавиш на разные задачи в окне настоек
popupSetup.onkeydown = function (event) {
  var target = event.target;
  if ((target.className === 'setup-close') && (event.keyCode === ENTER_KEYCODE)) {
    closePopup(popupSetup);
  }
};
// Обрабатываем выход из диалога по Esc
document.onkeydown = function (event) {
  if (event.keyCode === ESC_KEYCODE) {
    closePopup(popupSetup);
  }
};
// обрабатываем открытие диалогового окна по Enter на аватар
setupOpen.onkeydown = function (event) {
  if (event.keyCode === ENTER_KEYCODE) {
    event.preventDefault();
    openPopup(popupSetup);
  }
};
// обрабатываем открытие диалогового окна по клику на аватар
setupOpen.onclick = function (event) {
  event.preventDefault();
  openPopup(popupSetup);
};
// валидация формы
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

for (var j = 0; j < WIZARDS_QUANTITY; j++) {
  wizards[j] = {
    name: getFullName(),
    coatColor: getColor(COAT_COLORS),
    eyesColor: getColor(EYES_COLORS)
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
