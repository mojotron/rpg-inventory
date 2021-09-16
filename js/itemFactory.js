'use strict';
const Armory = (function () {
  const itemFactory = function (title, emoji, value, type, bonusArr) {
    const bonus = {
      maxHP: bonusArr[0],
      attack: bonusArr[1],
      armor: bonusArr[2],
      heal: bonusArr[3],
    };
    return { title, emoji, value, type, bonus };
  };
  //Arms
  const dagger = itemFactory('Dagger', '🔪', 12500, '1H', [0, 1, 0, 0]);
  const mace = itemFactory('Wooden Mace', '🏏', 30000, '1H', [0, 2, 0, 0]);
  const sword = itemFactory('Short Sword', '🗡️', 50000, '1H', [1, 5, 0, 0]);
  const bow = itemFactory(
    'Long Bow (2 hand)',
    '🏹',
    100000,
    '2H',
    [2, 7, 3, 0]
  );
  const axe = itemFactory(
    'Big Axe (2 hand)',
    '🪓',
    150000,
    '2H',
    [5, 10, 0, 0]
  );
  const shield = itemFactory('Kite Shield', '🛡️', 75000, '1H', [5, 0, 10, 0]);
  //Head
  const head1 = itemFactory('Cloth Cap', '🧢', 17500, 'head', [0, 0, 1, 0]);
  const head2 = itemFactory('Light Helmet', '⛑️', 55000, 'head', [1, 0, 4, 0]);
  const head3 = itemFactory('Heavy Helmet', '🪖', 88000, 'head', [2, 1, 6, 0]);
  //Body
  const body1 = itemFactory('Light Shirt', '🎽', 27500, 'body', [0, 0, 2, 0]);
  const body2 = itemFactory('Heavy Shirt', '👕', 35500, 'body', [1, 0, 3, 0]);
  const body3 = itemFactory('Body Armor', '🧥', 72500, 'body', [2, 0, 5, 0]);
  //Legs
  const legs1 = itemFactory('Light Shoes', '👟', 22500, 'legs', [0, 0, 2, 0]);
  const legs2 = itemFactory('Leather Shoes', '👞', 64000, 'legs', [1, 0, 4, 0]);
  const legs3 = itemFactory('Heavy Boots', '🥾', 82500, 'legs', [3, 1, 6, 0]);
  //Consumables
  const apple = itemFactory('Tasty Apple', '🍏', 85, 'food', [0, 0, 0, 1]);
  const cheese = itemFactory('Aged Cheese', '🧀', 725, 'food', [0, 0, 0, 3]);
  const meat = itemFactory('Chicken Leg', '🍗', 1050, 'food', [0, 0, 0, 5]);
  const potion = itemFactory(
    'Health Potion',
    '🧪',
    22550,
    'food',
    [0, 0, 0, 10]
  );
  //Special loot form monsters
  const socks = itemFactory('Dirty Socks', '🧦', 20000, 'legs', [1, 1, 2, 0]);
  const hammer = itemFactory('Mighty Hammer', '🔨', 80000, '1H', [3, 4, 3, 0]);
  //To my first language Ruby ❤️
  const pickAxe = itemFactory('Ruby Pickaxe', '⛏️', 100000, '1H', [5, 5, 5, 0]);
  const trident = itemFactory(
    'Oceanir (2 hand)',
    '🔱',
    150000,
    '2H',
    [0, 15, 0, 0]
  );
  const kimono = itemFactory('Samurai silk', '👘', 30000, 'body', [1, 1, 3, 0]);
  const legion = itemFactory('Battle Suite', '🥻', 30000, 'body', [3, 2, 6, 0]);
  const crown = itemFactory('Last King', '👑', 300000, 'head', [3, 2, 7, 0]);
  //prettier-ignore
  const special = {
    socks, kimono,//Common drop
    head3, body3, legs3,//Rare drop
    bow, axe, shield, legion, hammer, //Very Rear drop
    crown, trident,pickAxe,//Ultra rear drop
  }
  //prettier-ignore
  const shop = {
    dagger, mace, sword, head1, head2, body1, body2, legs1, legs2,
    apple, cheese, meat, potion,
  };
  return { special, shop };
})();
