'use strict';
//Game engin
let curChar = stomp; //TODO set to undefined when finish
//General Selectors
const body = document.querySelector('body');
const gameApp = document.querySelector('.game-display');
const loginCharName = document.querySelector('.login-user-character');
const loginCharPass = document.querySelector('.login-user-password');
const loginBtn = document.querySelector('.login-btn');
const shopTab = document.querySelector('.btn-tab[data-tab="shop"]');
const mainDisplay = document.querySelector('.game-actions-display');

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
//LOGIN EVENT HANDLER
const loginCharacter = function (event) {
  event.preventDefault();
  curChar = characters.find(char => char.getName() === loginCharName.value);
  if (curChar?.getPassword() === +loginCharPass.value) {
    updateCharacterUI();
    gameApp.style.opacity = '1';
  }
  //Clear form inputs
  loginCharName.value = loginCharPass.value = '';
  loginCharPass.blur();
  loginCharPass.blur();
};

loginBtn.addEventListener('click', loginCharacter);
//Shop tab event handler
const shopItemElements = function () {
  mainDisplay.innerHTML = '';
  items.forEach((item, i) => {
    const shopItem = document.createElement('div');
    shopItem.classList.add('item');
    shopItem.innerHTML = shopItemHTML(item, i);
    mainDisplay.insertAdjacentElement('beforeend', shopItem);
  });
};
//Display Items in shop
shopTab.addEventListener('click', shopItemElements);
//BUYING ITEM event handler
const buyItemFromShop = function (event) {
  if (!event.target.classList.contains('btn-buy-item')) return;
  const item = items[event.target.dataset.itemPosition];
  curChar.buyItem(item);
  updateCharacterUI();
};
mainDisplay.addEventListener('click', buyItemFromShop);
//DISPLAYING ACTIONS
const actionsTab = document.querySelector(`.btn-tab[data-tab="actions"]`);
const actionElements = function () {
  mainDisplay.innerHTML = '';
  curChar.getActions().forEach((action, i) => {
    const newAction = document.createElement('div');
    newAction.classList.add('action');
    if (i % 2 === 0)
      newAction.style.background =
        'linear-gradient(-90deg, rgb(247, 115, 54), rgb(216, 202, 192)';
    newAction.innerHTML = actionHTML(action, i);
    mainDisplay.insertAdjacentElement('beforeend', newAction);
  });
};
actionsTab.addEventListener('click', actionElements);
//Option box for inventory items
const inventory = document.querySelector('.character-inventory-slots');
inventory.addEventListener('dblclick', function (e) {
  e.preventDefault();
  if (!e.target.classList.contains('inventory-slot')) return;
  if (e.target.textContent === '') return;

  const [x, y] = [e.clientX, e.clientY];
  const slotIndex = e.target.dataset.slot;
  const item = curChar.getInventory()[slotIndex];

  const optionsBox = document.createElement('div');
  optionsBox.classList.add('options-box');
  optionsBox.style.position = 'absolute';
  optionsBox.style.top = `${y}px`;
  optionsBox.style.left = `${x}px`;

  const html = generalOptionBoxHTML(item) + inventoryOptionsBoxHtml(item);
  optionsBox.innerHTML = html;
  body.appendChild(optionsBox);

  const sellBtn = document.querySelector(
    `.options-box button[data-option="sell"]`
  );
  sellBtn.addEventListener('click', function () {
    curChar.sellItem(slotIndex);
    updateCharacterUI();
    const box = document.querySelector('.options-box');
    body.removeChild(box);
  });

  const sendBtn = document.querySelector(
    '.options-box button[data-option="send"]'
  );
  sendBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const input = document.querySelector('.character-target-name');
    if (input.value === curChar.getName()) return;
    const targetChar = characters.find(char => char.getName() === input.value);
    if (!targetChar) return;
    if (targetChar.fullBag()) return;
    targetChar.addItem(curChar.removeItem(slotIndex));

    updateCharacterUI();
    const box = document.querySelector('.options-box');
    body.removeChild(box);
  });

  if (document.querySelector('.options-box button[data-option="consume"]')) {
    const consumeBtn = document.querySelector(
      '.options-box button[data-option="consume"]'
    );
    consumeBtn.addEventListener('click', function (e) {
      curChar.eatFood(slotIndex);

      updateCharacterUI();
      const box = document.querySelector('.options-box');
      body.removeChild(box);
    });
  }

  if (document.querySelector('.options-box button[data-option="equip"]')) {
    const equipBtn = document.querySelector(
      '.options-box button[data-option="equip"]'
    );
    equipBtn.addEventListener('click', function () {
      curChar.equipGear(slotIndex);
      updateCharacterUI();
      const box = document.querySelector('.options-box');
      body.removeChild(box);
    });
  }
});

//CLOSE OPTION BOX if user clicks outside box
body.addEventListener('click', function (e) {
  if (e.target.closest('.options-box')) return;
  const box = document.querySelector('.options-box');
  if (box) box.remove();
});

//MAKE EQUIPMENT OPTION ITEM BOX
const equipmentContainer = document.querySelector('.character-gear-slots');
equipmentContainer.addEventListener('dblclick', function (e) {
  if (!e.target.classList.contains('gear-slot')) return;
  if (e.target.textContent === '') return;
  //create option box element with info, send, sell, remove
  const [x, y] = [e.clientX, e.clientY];
  const slot = e.target.dataset.gear;
  const item = curChar.getGear(slot);

  const optionsBox = document.createElement('div');
  optionsBox.classList.add('options-box');
  optionsBox.style.position = 'absolute';
  optionsBox.style.top = `${y}px`;
  optionsBox.style.left = `${x}px`;

  const html = generalOptionBoxHTML(item) + equipmentOptionsBoxHtml(item);
  optionsBox.innerHTML = html;
  body.appendChild(optionsBox);
  //
  const sellBtn = document.querySelector(
    `.options-box button[data-option="sell"]`
  );
  sellBtn.addEventListener('click', function () {
    //TODO sell from char function
    curChar.removeGear(slot);
    curChar.earnCoins(item.value);
    updateCharacterUI();
    const box = document.querySelector('.options-box');
    body.removeChild(box);
  });

  const sendBtn = document.querySelector(
    '.options-box button[data-option="send"]'
  );
  sendBtn.addEventListener('click', function (e) {
    e.preventDefault();
    const input = document.querySelector('.character-target-name');
    if (input.value === curChar.getName()) return;
    const targetChar = characters.find(char => char.getName() === input.value);
    if (!targetChar) return;
    if (targetChar.fullBag()) return;

    targetChar.addItem(curChar.removeGear(slot));

    updateCharacterUI();
    document.querySelector('.options-box').remove();
    // body.removeChild(box);
  });

  const btnRemove = document.querySelector(
    '.options-box button[data-option="remove"]'
  );
  btnRemove.addEventListener('click', function () {
    curChar.addItem(curChar.removeGear(slot));
    updateCharacterUI();
    const box = document.querySelector('.options-box');
    body.removeChild(box);
  });
  //
});
