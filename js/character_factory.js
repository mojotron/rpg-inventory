'use strict';
const CharacterFactory = function (character, password) {
  //Character main stats
  let _hitPoints = 10;
  let _maxHitPoints = 10;
  let _attack = 1;
  let _armor = 0;
  let _coins = 19999;

  const getName = () => character;
  const getPassword = () => password;
  const getHP = () => _hitPoints;
  const getMaxHP = () => _maxHitPoints;
  const getAttack = () => _attack;
  const getArmor = () => _armor;
  const getCoins = () => _coins;
  const _earnCoins = value => (_coins += value);
  const _loseCoins = value => (_coins -= value);
  const _hpCorrect = function () {
    if (_hitPoints > _maxHitPoints) _hitPoints = _maxHitPoints;
  };
  const addCoins = function (coins) {
    _earnCoins(coins);
  };
  const sendCoins = function (coins, character) {
    _loseCoins(coins);
    character.addCoins(coins);
  };
  //Character game log
  const _actions = [];
  const _makeAction = function (message) {
    const date = new Date().toISOString();
    _actions.push({ date, message });
  };
  const getActions = () => [..._actions];

  //Character inventory
  const _inventory = Array.from({ length: 9 }, () => null);
  const _emptySlot = () => _inventory.findIndex(ele => ele === null);
  const fullBag = () => !_inventory.some(ele => ele === null);
  const addItem = function (item) {
    const emptySpot = _emptySlot();
    if (emptySpot === -1) return `Inventory is full!`;
    _inventory[emptySpot] = item;
  };
  const removeItem = function (spot) {
    if (!_inventory[spot]) return;
    const item = _inventory[spot];
    _inventory[spot] = null;
    return item;
  };
  const buyItem = function (item) {
    if (item.value > getCoins()) {
      alert('Not enough coins');
      return;
    }
    if (fullBag()) {
      alert('Your bag is full');
      return;
    }
    addItem(item); //item to inventory
    _loseCoins(item.value); //decrement gold
    _makeAction(`You bought ${item.emoji} ${item.title}.`);
  };

  const sellItem = function (spot) {
    const item = removeItem(spot);
    _earnCoins(item.value);
  };

  const eatFood = function (spot) {
    const item = removeItem(spot);
    _hitPoints += item.bonus.heal;
    _hpCorrect();
    _makeAction(
      `You consumed ${item.emoji} ${item.title} for additional ${item.bonus.heal} HP.`
    );
  };

  const getInventory = () => [..._inventory];

  //Character equipment
  const _equipment = {
    head: null,
    body: null,
    legs: null,
    leftArm: null,
    rightArm: null,
  };
  const _addBonus = function (item) {
    const { maxHP, attack, armor } = item.bonus;
    _maxHitPoints += maxHP;
    _attack += attack;
    _armor += armor;
  };
  const _removeBonus = function (item) {
    const { maxHP, attack, armor } = item.bonus;
    _maxHitPoints -= maxHP;
    _attack -= attack;
    _armor -= armor;
  };

  const getGear = slot => _equipment[slot];

  const _itemGearSlots = function (item) {
    if (item.type === 'head') return getGear('head') === null;
    if (item.type === 'body') return getGear('body') === null;
    if (item.type === 'legs') return getGear('legs') === null;
    if (item.type === '1H') return !getGear('leftArm') || !getGear('rightArm');
    if (item.type === '2H') return !getGear('leftArm') && !getGear('rightArm');
  };
  const addGear = function (slot, item) {
    _equipment[slot] = item;
    _addBonus(item);
  };

  const equipGear = function (spot) {
    const item = _inventory[spot];
    const free = _itemGearSlots(item);
    if (!free) return;
    if (item.type === 'head') addGear('head', removeItem(spot));
    if (item.type === 'body') addGear('body', removeItem(spot));
    if (item.type === 'legs') addGear('legs', removeItem(spot));
    if (item.type === '1H') {
      if (_equipment.leftArm === null) {
        addGear('leftArm', removeItem(spot));
        return;
      }
      if (_equipment.rightArm === null) {
        addGear('rightArm', removeItem(spot));
        return;
      }
    }
    if (item.type === '2H') {
      addGear('leftArm', removeItem(spot));
      addGear('rightArm', item);
      _removeBonus(item);
    }
    _makeAction(`You equipped ${item.emoji} ${item.title}`);
  };

  const removeGear = function (slot) {
    const item = _equipment[slot];

    if (item.type === '2H') {
      _equipment.leftArm = null;
      _equipment.rightArm = null;
    } else {
      _equipment[slot] = null;
    }
    _removeBonus(item);
    _makeAction(`You removed ${item.emoji} ${item.title} from equipment`);
    _hpCorrect();
    return item;
  };

  const sellGear = function (slot) {
    const item = removeGear(slot);
    _earnCoins(item.value);
    _makeAction(`You sold ${item.emoji} ${item.title}`);
  };

  const heal = function () {
    _hitPoints++;
    _hpCorrect();
  };

  const monsterHunt = function (monster) {
    if (getHP() === 1) {
      alert('To low HP for hunt!');
      return;
    }
    if (fullBag()) {
      alert('Inventory fool, sell some item first!');
      return;
    }
    if (getAttack() > monster.armor && getArmor() > monster.attack) {
      //char wins
      const loot = monster.getLoot();
      _makeAction(
        `You killed ${monster.emoji}${monster.type} and looted ${loot.emoji}${loot.title}!`
      );
      addItem(loot);
      return;
    }
    if (getAttack() >= monster.armor && getArmor() <= monster.attack) {
      const dmg = monster.attack - getArmor();
      console.log(dmg);
      _hitPoints = _hitPoints - dmg > 1 ? _hitPoints - dmg : 1;
      if (getHP() > 1) {
        const loot = monster.getLoot();
        _makeAction(
          `You killed ${monster.emoji}${monster.type} and looted ${loot.emoji}${loot.title}!
          You lost ${dmg} HP points in combat!`
        );
        addItem(loot);
        return;
      } else {
        _makeAction(
          `${monster.emoji}${monster.type} defeated you!
          You lost ${dmg} HP points in combat! Heal up and try again`
        );
        return;
      }
    }
    if (getAttack() < monster.armor && getArmor() > monster.attack) {
      //lose and lose hp no winner
      const dmg = Math.trunc(getHP() / 2);
      _hitPoints -= dmg;
      _makeAction(`After long battle against ${monster.emoji}${monster.type},
      there monster fled battleground and you lost ${dmg} HP points!`);
      return;
    }
    if (getAttack() < monster.armor && getArmor() < monster.attack) {
      _hitPoints = 1;
      _makeAction(`You found ${monster.emoji}${monster.type} but you are to weak
      to fight this monster, you escaped but took big hit! Rest up hero!`);
      return;
    }
  };

  const init = () =>
    _makeAction(`${getName()} is created. Welcome to the RPG-Inventory!`);
  addItem(Armory.shop.dagger);
  addItem(Armory.shop.body1);
  addItem(Armory.shop.cheese);
  init();
  //Majority of this functions should be privet, but this is simple app
  //and there is no database for storing character. Lot of methods are public so I can
  //make sample users.
  return {
    //Stats
    getName,
    getPassword,
    getHP,
    getMaxHP,
    getAttack,
    getArmor,
    getCoins,
    addCoins,
    sendCoins,
    //Actions
    getActions,
    //Inventory
    addItem,
    removeItem,
    getInventory,
    fullBag,
    eatFood,
    buyItem,
    sellItem,
    //Equipment
    getGear,
    addGear,
    removeGear,
    equipGear,
    sellGear,
    heal,
    monsterHunt,
  };
};
const stomp = CharacterFactory('Stomp', '111');
stomp.addItem(Armory.shop.sword);
stomp.addItem(Armory.shop.apple);
stomp.addItem(Armory.special.trident);
stomp.addGear('head', Armory.special.head3);
stomp.addGear('body', Armory.special.body3);
stomp.addGear('legs', Armory.special.legs3);
stomp.addGear('rightArm', Armory.shop.sword);
const draw = CharacterFactory('Draw', '222');
draw.addItem(Armory.special.bow);
draw.addItem(Armory.shop.cheese);
draw.addItem(Armory.shop.meat);
draw.addGear('body', Armory.shop.body2);
draw.addGear('leftArm', Armory.shop.dagger);
const slick = CharacterFactory('Slick', '333');
slick.addItem(Armory.shop.head1);
slick.addItem(Armory.shop.body1);
slick.addItem(Armory.shop.legs1);
slick.addItem(Armory.shop.sword);
slick.addItem(Armory.shop.sword);
slick.addItem(Armory.special.axe);
const characters = [stomp, draw, slick];
