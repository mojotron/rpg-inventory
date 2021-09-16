'use strict';
const GameUtilities = (function () {
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

  const formatDateText = function (dateSting) {
    const now = new Date();
    const date = new Date(dateSting);
    const days = Math.floor((now - date) / (24 * 60 * 60 * 1000));
    if (days === 0) return `Today`;
    if (days === 0) return `Yesterday`;
    if (day < 8) return `${days} days ago`;
    return formatDate(date);
  };

  const infoItemHtml = function (item) {
    const { maxHP, attack, armor, heal } = item.bonus;
    const [gold, silver, copper] = copperToCoins(item.value);
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
    </div>`;
  };

  const shopItemHTML = function (item, name) {
    return (
      infoItemHtml(item) +
      `<button class="btn-buy-item" data-item-name="${name}">Buy Item</button>`
    );
  };

  const actionHTML = function (action, i) {
    return `
  <p class="action-index">${i + 1}</p>
  <p class="action-date">${formatDateText(action.date)}</p>
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
    //Only add sell option if character is in shop tab
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

  const monsterHtml = function (monster) {
    return `
    <div class="monster-info">
      <p><span>${monster.emoji}</span><span>${monster.type}</span></p>
      <p>🪓<span>10</span>🛡️<span>15</span></p>
    </div>
    <div class="monster-loot">
      <p>Loot drop:</p>
      ${getLootHtml(monster.loot)}
    </div>
    
  `;
  };

  const getLootHtml = function (loot) {
    let html = '';
    loot.forEach(item => {
      html += '<div class="loot-item">' + infoItemHtml(item) + '</div>';
    });
    return html;
  };

  const clearInputs = function (...inputs) {
    inputs.forEach(input => {
      input.value = '';
      input.blur();
    });
  };

  const makeAlert = function (string) {
    document.querySelector('.alert-msg').textContent = string;
    alertBox.classList.remove('hidden');
    overlay.classList.remove('hidden');
  };

  const closeAlert = function () {
    alertBox.classList.add('hidden');
    if (!createCharForm.classList.contains('hidden')) return;
    overlay.classList.add('hidden');
  };

  return {
    copperToCoins,
    coinsToCopper,
    formatDate,
    formatDateText,
    infoItemHtml,
    shopItemHTML,
    actionHTML,
    generalOptionBoxHTML,
    inventoryOptionsBoxHtml,
    equipmentOptionsBoxHtml,
    monsterHtml,
    getLootHtml,
    clearInputs,
    makeAlert,
    closeAlert,
  };
})();
