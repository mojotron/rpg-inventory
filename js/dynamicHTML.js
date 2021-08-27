'use strict';
//Coins format functions
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

const formatDate = function (dateString) {
  const date = new Date(dateString);
  const options = { year: 'numeric', month: 'numeric', day: 'numeric' };
  return Intl.DateTimeFormat(navigator.language, options).format(date);
};

const shopItemHTML = function (item, index) {
  const [gold, silver, copper] = copperToCoins(item.value);
  const { maxHP, attack, armor, heal } = item.bonus;
  return `
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
    <button class="btn-buy-item" data-item-position="${index}">Buy Item</button>
  `;
};

const actionHTML = function (action, i) {
  return `
  <p class="action-index">${i + 1}</p>
  <p class="action-date">${formatDate(action.date)}</p>
  <p class="action-message">${action.message}</p>
  `;
};

const generalOptionBoxHTML = function (item) {
  const { maxHP, attack, armor, heal } = item.bonus;
  const [gold, silver, copper] = copperToCoins(item.value);
  return `
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
