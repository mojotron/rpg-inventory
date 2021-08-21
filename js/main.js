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

let currentChar;
//pre made characters

//Selectors
const gameApp = document.querySelector('.game-display');
//login selectors
const loginCharName = document.querySelector('.login-user-character');
const loginCharPass = document.querySelector('.login-user-password');
const loginBtn = document.querySelector('.login-btn');
//Character ui selectors
const charName = document.querySelector('.character-name');
const charHP = document.querySelector('.character-hit-points');
const charAttack = document.querySelector('.character-attack');
const charArmor = document.querySelector('.character-armor');
const charGold = document.querySelector('.currency-gold');
const charSilver = document.querySelector('.currency-silver');
const charCopper = document.querySelector('.currency-copper');
//LOG IN USER
loginBtn.addEventListener('click', function (e) {});
//////////////////////////////////////////////////////////////////////
//Display Items in shop
const shopTab = document.querySelector('.btn-tab[data-tab="shop"]');
const mainDisplay = document.querySelector('.game-actions-display');

shopTab.addEventListener('click', function () {
  mainDisplay.innerHTML = '';
  items.forEach(function (item) {
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
      <button class="btn-buy-item">Buy Item</button>
    `;

    newItem.innerHTML = itemHTML;
    mainDisplay.insertAdjacentElement('beforeend', newItem);
  });
});
////////////////////////////////////////////////////////////////////////////
