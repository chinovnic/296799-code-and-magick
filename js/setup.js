'use strict';
var WIZARD_NAMES = ['Иван', 'Хуан', 'Себастьян', 'Мария', 'Кристоф', 'Виктор', 'Юлия', 'Люпита', 'Вашингтон'];
var WIZARD_SURNAMES = ['да Марья', 'Верон', 'Мирабелла', 'Вальц', 'Онопко', 'Топольницкая', 'Нионго', 'Ирвинг'];
var COAT_COLORS = ['rgb(101, 137, 164)', 'rgb(241, 43, 107)', 'rgb(146, 100, 161)', 'rgb(56, 159, 117)', 'rgb(215, 210, 55)', 'rgb(0, 0, 0)'];
var EYES_COLORS = ['black', 'red', 'blue', 'yellow', 'green'];
var similarListElement = document.querySelector('.setup-similar-list');
var similarWizardTemplate = document.querySelector('#similar-wizard-template').content.querySelector('.setup-similar-item');

var getRandom = function (arrLength) {
  var index = Math.floor(Math.random() * arrLength);
  return index;
};

var getFullName = function () {
  var fullName = WIZARD_NAMES[getRandom(WIZARD_NAMES.length)] + ' ' + WIZARD_SURNAMES[getRandom(WIZARD_SURNAMES.length)];
  return fullName;
};

var getCoatColor = function () {
  var currentCoatColor = COAT_COLORS[getRandom(COAT_COLORS.length)];
  return currentCoatColor;
};
var getEyesColor = function () {
  var currentEyesColor = EYES_COLORS[getRandom(EYES_COLORS.length)];
  return currentEyesColor;
};

var wizards = [
  {
    name: getFullName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  },
  {
    name: getFullName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  },
  {
    name: getFullName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  },
  {
    name: getFullName(),
    coatColor: getCoatColor(),
    eyesColor: getEyesColor()
  }
];

document.querySelector('.setup').classList.remove('hidden');

var renderWizard = function () {
  var wizardElement = similarWizardTemplate.cloneNode(true);
  wizardElement.querySelector('.setup-similar-label').textContent = wizards[i].name;
  wizardElement.querySelector('.wizard-coat').style.fill = wizards[i].coatColor;
  wizardElement.querySelector('.wizard-eyes').style.fill = wizards[i].coatColor;
  return wizardElement;
};

var fragment = document.createDocumentFragment();

for (var i = 0; i < wizards.length; i++) {
  fragment.appendChild(renderWizard(wizards[i]));
}
similarListElement.appendChild(fragment);
document.querySelector('.setup-similar').classList.remove('hidden');
