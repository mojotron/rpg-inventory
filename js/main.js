'use strict';
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
const newCharBtn = document.querySelector('.new-char-btn');
const overlay = document.querySelector('.overlay');
const createCharForm = document.querySelector('.create-new-character');
const closeFormBtn = document.querySelector('.btn-close-form');
const createCharBtn = document.querySelector('.btn-create-char');
const nameInput = document.querySelector('.name-input');
const passwordInput = document.querySelector('.password-input');
const confirmPasswordInput = document.querySelector('.password-confirm-input');
const alertBox = document.querySelector('.alert-box');
const goHunt = document.querySelector('.btn-go-hunt');
const sendGoldValue = document.querySelector('#send-coins-gold');
const sendSilverValue = document.querySelector('#send-coins-silver');
const sendCopperValue = document.querySelector('#send-coins-copper');
const sendTo = document.querySelector('.send-coins-to');
const sendCoinsBtn = document.querySelector('.btn-send-coins');
const tabs = document.querySelector('.game-options-selector');
//////////////////////////////////////////////////////////////////
const GameEngin = function () {
  let curChar;
  let hpRegeneration;
  //UPDATE CHARACTER UI
  const updateCharacterStats = function () {
    document.querySelector('.character-name').textContent = curChar.getName();
    document.querySelector('.character-HP').textContent = curChar.getHP();
    document.querySelector('.character-max-HP').textContent =
      curChar.getMaxHP();
    document.querySelector('.character-attack').textContent =
      curChar.getAttack();
    document.querySelector('.character-armor').textContent = curChar.getArmor();
    const [gold, silver, copper] = GameUtilities.copperToCoins(
      curChar.getCoins()
    );
    document.querySelector('.currency-gold').textContent = gold;
    document.querySelector('.currency-silver').textContent = silver;
    document.querySelector('.currency-copper').textContent = copper;
  };
  //UPDATE INVENTORY
  const updateCharacterInventory = function () {
    curChar.getInventory().forEach((item, i) => {
      const domSlot = document.querySelector(
        `.inventory-slot[data-slot="${i}"`
      );
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
    if (document.querySelector('.btn-tab-active').dataset.tab === 'actions')
      actionElements();
  };
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
  const restartRegeneration = function () {
    if (hpRegeneration) clearInterval(hpRegeneration);
    hpRegeneration = startHPRegeneration(10);
  };
  const loginCharacter = function (event) {
    event.preventDefault();
    //If you try relog character , this stops resetting timer
    if (curChar?.getName() === loginCharName.value) {
      GameUtilities.clearInputs(loginCharName, loginCharPass);
      return;
    }
    curChar = characters.find(char => char.getName() === loginCharName.value);
    if (!curChar) return;
    if (curChar?.getPassword() === loginCharPass.value) {
      updateCharacterUI();
      restartRegeneration();
      gameApp.classList.remove('hidden');
    }
    GameUtilities.clearInputs(loginCharName, loginCharPass);
  };

  const shopItemElements = function () {
    mainDisplay.innerHTML = '';
    for (const [key, obj] of Object.entries(Armory.shop)) {
      const shopItem = document.createElement('div');
      shopItem.classList.add('item');
      shopItem.innerHTML = GameUtilities.shopItemHTML(obj, key);
      mainDisplay.insertAdjacentElement('beforeend', shopItem);
    }
  };

  const buyItemFromShop = function (event) {
    if (!event.target.classList.contains('btn-buy-item')) return;
    const item = Armory.shop[event.target.dataset.itemName];
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
          'linear-gradient(90deg, rgb(195, 201, 200), #e89c77';
      newAction.innerHTML = GameUtilities.actionHTML(action, i);
      mainDisplay.insertAdjacentElement('afterbegin', newAction);
    });
  };

  const monsterpediaElements = function () {
    mainDisplay.innerHTML = '';
    Monster.monsters.forEach(monster => {
      const newMonster = document.createElement('div');
      newMonster.classList.add('monster');
      newMonster.innerHTML = GameUtilities.monsterHtml(monster);
      mainDisplay.insertAdjacentElement('beforeend', newMonster);
    });
  };

  const sendItemActions = function (item, targetChar) {
    curChar.makeAction(
      `You gave ${item.emoji}${item.title} to ${targetChar.getName()}`
    );
    targetChar.makeAction(
      `You got ${item.emoji}${item.title} from ${curChar.getName()}`
    );
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
    if (!targetChar) {
      GameUtilities.makeAlert(`No character with name of ${input.value}`);
      return;
    }
    if (targetChar.fullBag()) {
      GameUtilities.makeAlert(`${targetChar.getName()} have full bag!`);
      return;
    }
    const item = curChar.removeItem(spot);
    targetChar.addItem(item, input.value);
    sendItemActions(item, targetChar);
    removeBoxAndUpdateUI();
  };

  const invConsumeBtnHandler = function (spot) {
    curChar.eatFood(spot);
    removeBoxAndUpdateUI();
  };

  const invEquipBtnHandler = function (spot) {
    curChar.equipGear(spot);
    restartRegeneration();
    removeBoxAndUpdateUI();
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
    if (!targetChar) {
      GameUtilities.makeAlert(`No character with name of ${input.value}`);
      return;
    }
    if (targetChar.fullBag()) {
      GameUtilities.makeAlert(`${targetChar.getName()} have full bag!`);
      return;
    }
    const item = curChar.removeGear(slot);
    targetChar.addItem(item);
    sendItemActions(item, targetChar);
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
  const closeOptionBox = function (e) {
    if (e.target.closest('.options-box')) return;
    const box = document.querySelector('.options-box');
    if (box) box.remove();
  };

  const createOptionBox = function (x, y) {
    const box = document.createElement('div');
    box.classList.add('options-box');
    box.style.top = `${y - 175}px`;
    box.style.left = `${x - 50}px`;
    return box;
  };
  //MAKE INVENTORY OPTION BOX ELEMENT
  const itemOperationInventory = function (event) {
    if (!event.target.classList.contains('inventory-slot')) return;
    if (event.target.textContent === '') return;

    const spotIndex = event.target.dataset.slot;
    const item = curChar.getInventory()[spotIndex];
    //Create option box element to current mouse position
    const optionsBox = createOptionBox(event.clientX, event.clientY);
    optionsBox.innerHTML =
      GameUtilities.generalOptionBoxHTML(item) +
      GameUtilities.inventoryOptionsBoxHtml(item);
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
  };
  //MAKE EQUIPMENT OPTION BOX ELEMENT
  const itemOperationEquipment = function (event) {
    if (!event.target.classList.contains('gear-slot')) return;
    if (event.target.textContent === '') return;

    const slot = event.target.dataset.gear;
    const item = curChar.getGear(slot);
    //Create option box element to current mouse position
    const optionsBox = createOptionBox(event.clientX, event.clientY);
    optionsBox.innerHTML =
      GameUtilities.generalOptionBoxHTML(item) +
      GameUtilities.equipmentOptionsBoxHtml(item);
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
  };

  const sendCoinsHandler = function (event) {
    event.preventDefault();
    const coins = GameUtilities.coinsToCopper(
      +sendGoldValue.value,
      +sendSilverValue.value,
      +sendCopperValue.value
    );
    if (curChar.getCoins() < coins) {
      GameUtilities.makeAlert('Not enough coins');
      return;
    }
    const targetChar = characters.find(char => char.getName() === sendTo.value);
    if (!targetChar) {
      GameUtilities.makeAlert('No such character');
      return;
    }
    curChar.sendCoins(coins, targetChar);
    GameUtilities.clearInputs(
      sendGoldValue,
      sendSilverValue,
      sendCopperValue,
      sendTo
    );
    updateCharacterUI();
  };
  //TABS
  const removeCssClass = function (selector, cssClass) {
    document.querySelectorAll(selector).forEach(ele => {
      ele.classList.remove(cssClass);
    });
  };
  const switchTabHandler = function (event) {
    if (!event.target.classList.contains('btn-tab')) return;
    removeCssClass('.btn-tab', 'btn-tab-active');
    event.target.classList.add('btn-tab-active');
    if (event.target.dataset.tab === 'actions') actionElements();
    if (event.target.dataset.tab === 'shop') shopItemElements();
    if (event.target.dataset.tab === 'monsterpedia') monsterpediaElements();
  };

  const monsterHuntHandler = function (event) {
    event.preventDefault();
    curChar.monsterHunt(Monster.generateMonster());
    restartRegeneration();
    updateCharacterUI();
  };

  const newCharHandler = function () {
    overlay.classList.remove('hidden');
    createCharForm.classList.remove('hidden');
    nameInput.focus();
  };

  const creatCharHandler = function (event) {
    event.preventDefault();
    if (characters.find(char => nameInput.value === char.getName())) {
      GameUtilities.makeAlert('Name taken');
      return;
    }
    if (passwordInput.value !== confirmPasswordInput.value) {
      GameUtilities.makeAlert('Password and confirm password miss match');
      return;
    }
    const newChar = CharacterFactory(nameInput.value, passwordInput.value);
    characters.push(newChar);
    GameUtilities.clearInputs(nameInput, passwordInput, confirmPasswordInput);
    overlay.classList.add('hidden');
    createCharForm.classList.add('hidden');
    if (hpRegeneration) clearInterval(hpRegeneration);
    // hpRegeneration = undefined;
    hpTimer.textContent = '02:00';
    curChar = undefined;
    gameApp.classList.add('hidden');
  };

  const closeFormHandler = function () {
    overlay.classList.add('hidden');
    createCharForm.classList.add('hidden');
    GameUtilities.clearInputs(nameInput, passwordInput, confirmPasswordInput);
  };

  const init = function () {
    loginBtn.addEventListener('click', loginCharacter);
    mainDisplay.addEventListener('click', buyItemFromShop);
    inventoryContainer.addEventListener('dblclick', itemOperationInventory);
    equipmentContainer.addEventListener('dblclick', itemOperationEquipment);
    body.addEventListener('click', closeOptionBox);
    sendCoinsBtn.addEventListener('click', sendCoinsHandler);
    tabs.addEventListener('click', switchTabHandler);
    goHunt.addEventListener('click', monsterHuntHandler);
    newCharBtn.addEventListener('click', newCharHandler);
    createCharBtn.addEventListener('click', creatCharHandler);
    closeFormBtn.addEventListener('click', closeFormHandler);
    document
      .querySelector('.btn-close-alert')
      .addEventListener('click', GameUtilities.closeAlert);
  };
  init();
};

GameEngin();
