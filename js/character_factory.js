'use strict';
//Character inventory
const inventoryFactory = function () {
  const _inventory = Array.from({ length: 9 }, () => null);
  const _isFull = () => !_inventory.includes(null);
  const _emptySlot = () => _inventory.findIndex(ele => ele === null);
  const getInventory = () => [..._inventory]; //preventing mutating
  const addItem = function (item) {
    if (_isFull()) return;
    _inventory[_emptySlot] = item;
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
  const addGear = function (slot, item) {
    const oldItem = removeGear();
    _gearSlots[slot] = item;
    return oldItem;
  };
  const equipment = function () {
    const { head, body, legs, leftArm, rightArm } = _gearSlots;
    return [head, body, legs, leftArm, rightArm];
  };
  return { addGear, removeGear, equipment };
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
  //Character inventory ✔️
  //Character coins
  //Character actions
  return {
    getName,
    getPassword,
    getHitPoints,
    getAttack,
    getArmor,
  };
};

//base
//🧦
//
// const dagger 🔪
// const axe 🪓
// const sword 🗡️
// const bow 🏹
// shield 🛡️
// mace 🏏

// legs lv 1 👟
// legs lv 2 👞
// legs lv 3 🥾

// body lv 1 🎽
// body lv 2 👕
// body lv 3 🧥

// head lv 1 🧣
// head lv 2 🧢
// head lv 3 👑
