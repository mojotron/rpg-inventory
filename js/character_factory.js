const characterFactory = function (userName, userPassword) {
  let hitPoints = 3;
  let maxHitPoints = 10;
  let attack = 1;
  let armor = 0;
  const getName = () => userName;
  const getPassword = () => userPassword;
  const getHitPoints = () => `${hitPoints}/${maxHitPoints}`;
  const getAttack = () => attack;
  const getArmor = () => armor;
  //Character gear
  const gear = {
    head: null,
    body: null,
    legs: null,
    leftArm: null,
    rightArm: null,
  };
  const getGear = () => gear;
  //Character inventory
  const inventory = Array.from({ length: 9 }, () => null);
  const getInventory = () => inventory;
  //Currency
  const _currency = {
    gold: 4,
    silver: 99,
    copper: 99,
  };
  const getCurrency = function () {
    const { gold, silver, copper } = _currency;
    return [gold, silver, copper];
  };
  //Character Actions
  return {
    getName,
    getPassword,
    getInventory,
    getHitPoints,
    getAttack,
    getArmor,
    getCurrency,
    getGear,
  };
};

const itemFactory = function () {};

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
