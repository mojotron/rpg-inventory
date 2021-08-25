'use strict';
//Game engin
const coinsToCopper = function (gold, silver, copper) {
  return gold * 10000 + silver * 100 + copper;
};

const copperToCoins = function (value) {
  return [
    Math.trunc(value / 100 / 100),
    Math.trunc((value / 100) % 100),
    value % 100,
  ];
};

//pre made characters

//Selectors
const gameApp = document.querySelector('.game-display');
//login selectors
const loginCharName = document.querySelector('.login-user-character');
const loginCharPass = document.querySelector('.login-user-password');
const loginBtn = document.querySelector('.login-btn');
//LOG IN USER
const characters = [stomp, draw, slick];
let curChar = stomp;
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

const updateCharacterUI = function () {
  updateCharacterStats();
  updateCharacterInventory();
  updateCharacterEquipment();
};
updateCharacterUI();

loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  curChar = characters.find(char => char.getName() === loginCharName.value);
  if (curChar?.getPassword() === +loginCharPass.value) {
    //display relevant player stats
    updateCharacterStats();
    updateCharacterInventory();
    updateCharacterEquipment();
    //display game app
    gameApp.style.opacity = '1';
  }
  //Clear inputs
  loginCharName.value = loginCharPass.value = '';
  loginCharPass.blur();
  loginCharPass.blur();
});
//////////////////////////////////////////////////////////////////////
//Display Items in shop
const shopTab = document.querySelector('.btn-tab[data-tab="shop"]');
const mainDisplay = document.querySelector('.game-actions-display');

shopTab.addEventListener('click', function () {
  mainDisplay.innerHTML = '';
  items.forEach(function (item, i) {
    const newItem = document.createElement('div');
    newItem.classList.add('item');
    const [gold, silver, copper] = copperToCoins(item.value);
    const { maxHP, attack, armor, heal } = item.bonus;

    const itemHTML = `
      <div class="item-info">
        <p>${item.title} <span>${item.emoji}</span></p>
      </div>
      <div class="item-bonus">
        ${maxHP ? `<p>❤️+<span class="bonus-HP">${maxHP}</span></p>` : ''}
        ${attack ? `<p>🪓+<span class="bonus-attack">${attack}</span></p>` : ''}
        ${armor ? `<p>🛡️+<span class="bonus-armor">${armor}</span></p>` : ''}
        ${heal ? `<p>🩹+<span class="bonus-armor">${heal}</span></p>` : ''}
      </div>
      <div class="item-price">
        ${gold ? `<p>🟡<span class="price-gold">${gold}</span></p>` : ''}
        ${silver ? `<p>⚪<span class="price-silver">${silver}</span></p>` : ''}
        ${copper ? `<p>🟤<span class="price-copper">${copper}</span></p>` : ''}
      </div>
      <button class="btn-buy-item" data-item-position="${i}">Buy Item</button>
    `;

    newItem.innerHTML = itemHTML;
    mainDisplay.insertAdjacentElement('beforeend', newItem);
  });
});
////////////////////////////////////////////////////////////////////////////
//BUYING ITEM
mainDisplay.addEventListener('click', function (e) {
  if (!e.target.classList.contains('btn-buy-item')) return;
  //check if player have enough gold and have room in inventory
  const item = items[e.target.dataset.itemPosition];
  if (item.value > curChar.getCoins()) {
    alert('Not enough coins');
    return;
  }
  if (curChar.fullBag()) {
    alert('Your bag is full');
    return;
  }

  curChar.addItem(item); //item to inventory
  curChar.loseCoins(item.value); //decrement gold
  curChar.makeAction(`You bought ${item.emoji} ${item.title}.`);
  //make action
  updateCharacterStats();
  updateCharacterInventory();
});
//DISPLAYING ACTIONS
const actionsTab = document.querySelector(`.btn-tab[data-tab="actions"]`);

actionsTab.addEventListener('click', function () {
  mainDisplay.innerHTML = '';

  curChar.getActions().forEach((action, i) => {
    const date = new Date(action.date);

    const options = {
      year: 'numeric',
      month: 'numeric',
      day: 'numeric',
    };

    const formatDate = Intl.DateTimeFormat(navigator.language, options).format(
      date
    );

    const newAction = document.createElement('div');
    newAction.classList.add('action');

    if (i % 2 === 0) {
      newAction.style.background =
        'linear-gradient(90deg, rgb(189, 224, 221), rgb(54, 247, 205))';
    } else {
      newAction.style.background =
        'linear-gradient(-90deg, rgb(247, 115, 54), rgb(216, 202, 192)';
    }

    const actionHTML = `
    <p class="action-index">${i + 1}</p>
    <p class="action-date">${formatDate}</p>
    <p class="action-message">${action.message}</p>
    `;
    newAction.innerHTML = actionHTML;
    mainDisplay.insertAdjacentElement('beforeend', newAction);
  });
});

//INVENTORY ITEM BOX OPTIONS
const generalOptionBoxHTML = function (item) {
  const { maxHP, attack, armor, heal } = item.bonus;
  const [gold, silver, copper] = copperToCoins(item.value);
  const html = `
    <div class="options-item-info">
      <p class="options-item-title"><span>${item.emoji}</span>${item.title}</p>
      <div class="options-item-bonus">
        ${maxHP ? `<p class="item-bonus-HP">❤️+<span>${maxHP}</span></p>` : ''}
        ${
          attack ? `<p class="item-bonus-HP">🪓+<span>${attack}</span></p>` : ''
        }
        ${armor ? `<p class="item-bonus-HP">🛡️+<span>${armor}</span></p>` : ''}
        ${heal ? `<p class="item-bonus-HP">🩹+<span>${heal}</span></p>` : ''}
      </div>
      <div class="options-item-value">
      ${gold ? `<p class="item-value-gold">🟡<span>${gold}</span></p>` : ''}
      ${
        silver
          ? `<p class="item-value-silver">⚪<span>${silver}</span></p>`
          : ''
      }
      ${
        copper
          ? `<p class="item-value-copper">🟤<span>${copper}</span></p>`
          : ''
      }
      </div>
    </div>
    <form class="transfer-item">
        <input class="character-target-name" type="text" placeholder="character name" />
        <button class="btn-character-option" data-option="send">Send</button>
    </form>
    <button class="btn-character-option" data-option="sell">Sell</button>
  `;
  return html;
};

const inventoryOptionsBoxHtml = function (item) {
  if (item.type === `food`) {
    return `<button class="btn-character-option" data-option="consume">Consume</button>`;
  } else {
    return `<button class="btn-character-option" data-option="equip">Equip</button>`;
  }
};

const equipmentOptionsBoxHtml = function (item) {
  return `<button class="btn-character-option" data-option="remove">Remove</button>`;
};

const body = document.querySelector('body');
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
    sellItemFromInventory(slotIndex, item.value);
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

  const consumeBtn = document.querySelector(
    '.options-box button[data-option="consume"]'
  );
  consumeBtn.addEventListener('click', function (e) {
    curChar.eatFood(slotIndex);
    updateCharacterUI();

    const box = document.querySelector('.options-box');
    body.removeChild(box);
  });
});

//CLOSE OPTION BOX
body.addEventListener('click', function (e) {
  if (e.target.closest('.options-box')) return;
  const box = document.querySelector('.options-box');
  if (box) body.removeChild(box);
});
//SELL ITEM
//from inventory
const sellItemFromInventory = function (slotIndex, itemValue) {
  //remove item from inventory add value to coins
  curChar.removeItem(slotIndex);
  curChar.earnCoins(itemValue);
  //update character ui
  updateCharacterStats();
  updateCharacterInventory();
};

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
    const box = document.querySelector('.options-box');
    body.removeChild(box);
  });

  const btnRemove = document.querySelector(
    '.options-box button[data-option="remove"]'
  );
  btnRemove.addEventListener('click', function () {
    curChar.addItem(curChar.removeGear(slot));
    console.log(item);
    updateCharacterUI();
  });
  //
});
