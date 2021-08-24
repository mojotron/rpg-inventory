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
  const earnCoins = value => (_coins += value);
  const loseCoins = value => (_coins -= value);

  //Character game log
  const _actions = [];

  const makeAction = function (message) {
    const date = new Date().toISOString();
    _actions.push({ date, message });
  };
  const getActions = () => [..._actions];

  const init = () =>
    makeAction(`${character} is created. Welcome to the RPG-Inventory!`);
  init();

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

  const _decreaseItemValue = item => (item.value -= item.value * 0.1);

  const addGear = function (slot, item) {
    // _decreaseItemValue(item); //TODO this is item function, add to item factory
    _equipment[slot] = item;
    _addBonus(item);
  };

  const removeGear = function (slot) {
    const item = _equipment[slot];
    _equipment[slot] = null;
    _removeBonus(item);
    return item;
  };

  return {
    //Stats
    getName,
    getPassword,
    getHP,
    getMaxHP,
    getAttack,
    getArmor,
    getCoins,
    earnCoins,
    loseCoins,
    //Actions
    getActions,
    makeAction,
    //Inventory
    addItem,
    removeItem,
    getInventory,
    fullBag,
    //Equipment
    getGear,
    addGear,
    removeGear,
  };
};
const stomp = CharacterFactory('Stomp', 111);
stomp.addItem(sword);
stomp.addItem(apple);
stomp.addGear('head', head3);
stomp.addGear('body', body3);
stomp.addGear('legs', legs3);
stomp.addGear('rightArm', sword);
const draw = CharacterFactory('Draw', 222);
draw.addItem(bow);
draw.addItem(cheese);
draw.addItem(meat);
draw.addGear('body', body2);
draw.addGear('leftArm', dagger);
const slick = CharacterFactory('Slick', 333);
//Character
//character have name and password
//character have inventory and gear slots
//
//SHOP
//buy item
//--check if inventory has empty spot
//----no empty slot
//------tell player there is no room in inventory and return
//----no enough coins
//------tell player there is no enough coins return
//----have empty slot and have enough coins
//------create item and add it to player, decrement coins
//------create log 'You bought item x for y coins [DATE]'
//
//sell item
//--sell item from inventory or gear slot and get coins for that item
//----delete item
//----increment coins
//----create log 'You sold item for x coins [date]'
//
//TRANSFER
//transfer item
//--if target character have room in inventory
//----remove item from current player and create same item is targets inventory
//----create log for current player 'You gave item x to y [date]'
//----create log for target player 'You received item x from y [date]'
//transfer coins
//--if amount >= 0 send coins
//----decrement amount from current player and increment amount for target player
//----create log 'You gave x coins to y'
//----create log for current player 'You gave x coins to y [date]'
//----create log for target player 'You received x coins from y [date]'
//
//CONSUME ITEM
//
//GEAR MANAGEMENT
//
//GO IN MONSTER HUNT
