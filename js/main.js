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
const characters = [stomp];
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
updateCharacterStats(); //TODO remove
//UPDATE INVENTORY
const updateCharacterInventory = function () {
  curChar.getInventory().forEach((item, i) => {
    const domSlot = document.querySelector(`.inventory-slot[data-slot="${i}"`);
    domSlot.textContent = item?.emoji ?? '';
  });
};
updateCharacterInventory(); //TODO remove
//UPDATE EQUIPMENT
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  curChar = characters.find(char => char.getName() === loginCharName.value);
  if (curChar?.getPassword() === +loginCharPass.value) {
    //display relevant player stats
    updateCharacterStats();
    updateCharacterInventory();
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
  curChar.makeAction(`You bought ${item.title} ${item.emoji}`);
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
