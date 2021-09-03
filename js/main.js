'use strict';
//Game engin
let curChar = stomp; //TODO set to undefined when finish
//General Selectors
const body = document.querySelector('body');
const gameApp = document.querySelector('.game-display');
const loginCharName = document.querySelector('.login-user-character');
const loginCharPass = document.querySelector('.login-user-password');
const loginBtn = document.querySelector('.login-btn');
const mainDisplay = document.querySelector('.game-actions-display');
const inventoryContainer = document.querySelector('.character-inventory-slots');
const equipmentContainer = document.querySelector('.character-gear-slots');
const hpTimer = document.querySelector('.hp-timer');

const clearInputs = function (...inputs) {
  inputs.forEach(input => {
    input.value = '';
    input.blur();
  });
};

//UPDATE CHARACTER UI
const updateCharacterStats = function () {
  document.querySelector('.character-name').textContent = curChar.getName();
  document.querySelector('.character-HP').textContent = curChar.getHP();
  document.querySelector('.character-max-HP').textContent = curChar.getMaxHP();
  document.querySelector('.character-attack').textContent = curChar.getAttack();
  document.querySelector('.character-armor').textContent = curChar.getArmor();
  const [gold, silver, copper] = copperToCoins(curChar.getCoins());
  document.querySelector('.currency-gold').textContent = gold;
  document.querySelector('.currency-silver').textContent = silver;
  document.querySelector('.currency-copper').textContent = copper;
};
//UPDATE INVENTORY
const updateCharacterInventory = function () {
  curChar.getInventory().forEach((item, i) => {
    const domSlot = document.querySelector(`.inventory-slot[data-slot="${i}"`);
    domSlot.textContent = item?.emoji ?? '';
  });
};
//UPDATE EQUIPMENT
const updateCharacterEquipment = function () {
  const equipment = document.querySelectorAll('.gear-slot');
  equipment.forEach(slot => {
    slot.textContent = curChar.getGear(slot.dataset.gear)?.emoji ?? '';
  });
};
//UPDATE WHOLE CHARACTER COLUMN
const updateCharacterUI = function () {
  updateCharacterStats();
  updateCharacterInventory();
  updateCharacterEquipment();
};
updateCharacterUI(); //TODO remove when finish
//EVENT HANDLERS
const loginCharacter = function (event) {
  event.preventDefault();
  curChar = characters.find(char => char.getName() === loginCharName.value);
  if (curChar?.getPassword() === +loginCharPass.value) {
    updateCharacterUI();
    gameApp.style.opacity = '1';
  }
  clearInputs(loginCharName, loginCharPass);
};

const shopItemElements = function () {
  mainDisplay.innerHTML = '';
  items.forEach((item, i) => {
    const shopItem = document.createElement('div');
    shopItem.classList.add('item');
    shopItem.innerHTML = shopItemHTML(item, i);
    mainDisplay.insertAdjacentElement('beforeend', shopItem);
  });
};

const buyItemFromShop = function (event) {
  if (!event.target.classList.contains('btn-buy-item')) return;
  const item = items[event.target.dataset.itemPosition];
  curChar.buyItem(item);
  updateCharacterUI();
};

const actionElements = function () {
  mainDisplay.innerHTML = '';
  curChar.getActions().forEach((action, i) => {
    const newAction = document.createElement('div');
    newAction.classList.add('action');
    if (i % 2 === 0)
      newAction.style.background =
        'linear-gradient(-90deg, rgb(247, 115, 54), rgb(216, 202, 192)';
    newAction.innerHTML = actionHTML(action, i);
    mainDisplay.insertAdjacentElement('afterbegin', newAction);
  });
};
actionElements();

const monsterpediaElements = function () {
  mainDisplay.innerHTML = '';
  monsters.forEach(monster => {
    const newMonster = document.createElement('div');
    newMonster.classList.add('monster');
    newMonster.innerHTML = monsterHtml(monster);
    mainDisplay.insertAdjacentElement('afterbegin', newMonster);
  });
};
//Inventory box options event handlers
const invSellBtnHandler = function (spot) {
  curChar.sellItem(spot);
  removeBoxAndUpdateUI();
};
const invSendBtnHandler = function (spot) {
  const input = document.querySelector('.character-target-name');
  if (input.value === curChar.getName()) return;
  const targetChar = characters.find(char => char.getName() === input.value);
  if (!targetChar) return;
  if (targetChar.fullBag()) return;
  targetChar.addItem(curChar.removeItem(spot));
  removeBoxAndUpdateUI();
};
const invConsumeBtnHandler = function (spot) {
  curChar.eatFood(spot);
  removeBoxAndUpdateUI();
};

const invEquipBtnHandler = function (spot) {
  curChar.equipGear(spot);
  removeBoxAndUpdateUI();
  startHPRegeneration(120);
};
//Equipment option box handler
const gearSellBtnHandler = function (slot) {
  curChar.sellGear(slot);
  removeBoxAndUpdateUI();
};
const gearSendBtnHandler = function (slot) {
  const input = document.querySelector('.character-target-name');
  if (input.value === curChar.getName()) return;
  const targetChar = characters.find(char => char.getName() === input.value);
  if (!targetChar) return;
  if (targetChar.fullBag()) return;
  targetChar.addItem(curChar.removeGear(slot));
  removeBoxAndUpdateUI();
};
const gearRemoveBtnHandler = function (slot) {
  curChar.addItem(curChar.removeGear(slot));
  removeBoxAndUpdateUI();
};
//Equipment box options event listeners
const removeBoxAndUpdateUI = function () {
  document.querySelector('.options-box').remove();
  updateCharacterUI();
};
//CLOSE OPTION BOX if user clicks outside box
body.addEventListener('click', function (e) {
  if (e.target.closest('.options-box')) return;
  const box = document.querySelector('.options-box');
  if (box) box.remove();
});
const createOptionBox = function (x, y) {
  const box = document.createElement('div');
  box.classList.add('options-box');
  box.style.top = `${y}px`;
  box.style.left = `${x}px`;
  return box;
};
//MAKE INVENTORY OPTION BOX ELEMENT
inventoryContainer.addEventListener('dblclick', function (e) {
  if (!e.target.classList.contains('inventory-slot')) return;
  if (e.target.textContent === '') return;

  const spotIndex = e.target.dataset.slot;
  const item = curChar.getInventory()[spotIndex];
  //Create option box element to current mouse position
  const optionsBox = createOptionBox(e.clientX, e.clientY);
  optionsBox.innerHTML =
    generalOptionBoxHTML(item) + inventoryOptionsBoxHtml(item);
  body.appendChild(optionsBox);
  //Add event listeners to dynamically created buttons on inventory item
  //Sell button
  optionsBox
    .querySelector(`[data-option="sell"]`)
    .addEventListener('click', invSellBtnHandler.bind(this, spotIndex));
  //Send button
  optionsBox
    .querySelector('[data-option="send"]')
    .addEventListener('click', function (e) {
      e.preventDefault();
      invSendBtnHandler(spotIndex);
    });
  //Check if item is food or gear -> add event listener according if statement
  if (item.type === 'food') {
    optionsBox
      .querySelector('[data-option="consume"]')
      .addEventListener('click', invConsumeBtnHandler.bind(this, spotIndex));
  } else {
    optionsBox
      .querySelector('[data-option="equip"]')
      .addEventListener('click', invEquipBtnHandler.bind(this, spotIndex));
  }
});
//MAKE EQUIPMENT OPTION BOX ELEMENT
equipmentContainer.addEventListener('dblclick', function (e) {
  if (!e.target.classList.contains('gear-slot')) return;
  if (e.target.textContent === '') return;

  const slot = e.target.dataset.gear;
  const item = curChar.getGear(slot);
  //Create option box element to current mouse position
  const optionsBox = createOptionBox(e.clientX, e.clientY);
  optionsBox.innerHTML =
    generalOptionBoxHTML(item) + equipmentOptionsBoxHtml(item);
  body.appendChild(optionsBox);
  //Add event listeners to dynamically created buttons on gear item
  //Sell button
  optionsBox
    .querySelector(`[data-option="sell"]`)
    .addEventListener('click', gearSellBtnHandler.bind(this, slot));
  //Send button
  optionsBox
    .querySelector('[data-option="send"]')
    .addEventListener('click', function (e) {
      e.preventDefault();
      gearSendBtnHandler(slot);
    });
  //Remove gear form equipment
  optionsBox
    .querySelector('[data-option="remove"]')
    .addEventListener('click', gearRemoveBtnHandler.bind(this, slot));
});
//Event Listeners for section of the page
loginBtn.addEventListener('click', loginCharacter);
mainDisplay.addEventListener('click', buyItemFromShop);
//sending coins
const sendGoldValue = document.querySelector('#send-coins-gold');
const sendSilverValue = document.querySelector('#send-coins-silver');
const sendCopperValue = document.querySelector('#send-coins-copper');
const sendTo = document.querySelector('.send-coins-to');
const sendCoinsBtn = document.querySelector('.btn-send-coins');

sendCoinsBtn.addEventListener('click', function (e) {
  e.preventDefault();
  const coins = coinsToCopper(
    +sendGoldValue.value,
    +sendSilverValue.value,
    +sendCopperValue.value
  );
  if (curChar.getCoins() < coins) {
    alert('Not enough coins');
    return;
  }
  const targetChar = characters.find(char => char.getName() === sendTo.value);
  if (!targetChar) {
    alert('No such character');
    return;
  }
  curChar.sendCoins(coins, targetChar);
  clearInputs(sendGoldValue, sendSilverValue, sendCopperValue, sendTo);
  updateCharacterUI();
});

//TABS
const removeCssClass = function (selector, cssClass) {
  document.querySelectorAll(selector).forEach(ele => {
    ele.classList.remove(cssClass);
  });
};

const tabs = document.querySelector('.game-options-selector');
tabs.addEventListener('click', function (e) {
  if (!e.target.classList.contains('btn-tab')) return;
  removeCssClass('.btn-tab', 'btn-tab-active');
  e.target.classList.add('btn-tab-active');
  if (e.target.dataset.tab === 'actions') actionElements();
  if (e.target.dataset.tab === 'shop') shopItemElements();
  //TODO MONSTER HUNT TAB
  if (e.target.dataset.tab === 'monsterpedia') monsterpediaElements();
});

//HP REGENERATION
const startHPRegeneration = function (seconds) {
  if (curChar.getHP() === curChar.getMaxHP()) return;
  const tick = function () {
    const min = `${Math.trunc(time / 60)}`.padStart(2, 0);
    const sec = `${time % 60}`.padStart(2, 0);
    hpTimer.textContent = `${min}:${sec}`;
    if (time === 0) {
      clearInterval(timer);
      curChar.heal();
      updateCharacterUI();
      if (curChar.getHP() < curChar.getMaxHP()) startHPRegeneration(seconds);
    }
    time--;
  };
  let time = seconds;
  tick();
  const timer = setInterval(tick, 1000);
  return timer;
};
startHPRegeneration(120);

// const goHunt = document.querySelector('.btn-go-hunt');
// goHunt.addEventListener('click', function (e) {
//   e.preventDefault();
//   alert('HUNT');
// });
