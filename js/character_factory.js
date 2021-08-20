'use strict';
//Character inventory
const inventoryFactory = function () {
  const _inventory = Array.from({ length: 9 }, () => null);
  const _isFull = () => !_inventory.includes(null);
  const _emptySlot = () => _inventory.findIndex(ele => ele === null);
  const getInventory = () => [..._inventory]; //preventing mutating
  const addItem = function (item) {
    if (_isFull()) return;
    _inventory[_emptySlot()] = item;
  };
  const removeItem = function (index) {
    const item = _inventory[index];
    _inventory[index] = null;
    return item;
  };

  return { getInventory, addItem, removeItem };
};
//Character gear management
const equipmentFactory = function () {
  const _gearSlots = {
    head: null,
    body: null,
    legs: null,
    leftArm: null,
    rightArm: null,
  };
  const _emptySlot = slot => _gearSlots[slot] === null;
  const removeGear = function (slot) {
    const item = _emptySlot(slot) ? undefined : _gearSlots[slot];
    _gearSlots[slot] = null;
    return item;
  };
  const _checkGearSlot = function (item) {};
  const equipGear = function (slot, item) {
    const oldItem = removeGear();
    _gearSlots[slot] = item;
    return oldItem;
  };
  const curGear = () => _gearSlots;
  return { equipGear, removeGear, curGear };
};
//Character coins management
const coinsFactory = function () {
  const _coins = {
    gold: 4,
    silver: 99,
    copper: 99,
  };
  const gainCoins = function (gold, silver, copper) {};
  const loseCoins = function (gold, silver, copper) {};
  const currentCoins = function () {
    const { gold, silver, copper } = _coins;
    return [gold, silver, copper];
  };
  return { gainCoins, loseCoins, currentCoins };
};
//Character actions
const characterFactory = function (userName, userPassword) {
  let hitPoints = 10;
  let maxHitPoints = 10;
  let attack = 1;
  let armor = 0;
  const getName = () => userName;
  const getPassword = () => userPassword;
  const getHitPoints = () => `${hitPoints}/${maxHitPoints}`;
  const getAttack = () => attack;
  const getArmor = () => armor;
  //Character gear ✔️
  const gear = equipmentFactory();
  //Character inventory ✔️
  const inventory = inventoryFactory();
  //Character coins
  //Character actions
  return {
    getName,
    getPassword,
    getHitPoints,
    getAttack,
    getArmor,
    gear,
    inventory,
  };
};

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
