'use strict';
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
const dagger = itemFactory('Dagger', '🔪', 125000, '1H', [0, 1, 0, 0]);
const mace = itemFactory('Wooden Mace', '🏏', 30000, '1H', [0, 2, 0, 0]);
const sword = itemFactory('Short Sword', '🗡️', 50000, '1H', [1, 5, 0, 0]);
const bow = itemFactory('Long Bow', '🏹', 100000, '2H', [2, 7, 3, 0]);
const axe = itemFactory('Big Axe', '🪓', 150000, '2H', [5, 10, 0, 0]);
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
const bread = itemFactory('Aged Cheese', '🧀', 725, 'food', [0, 0, 0, 3]);
const meat = itemFactory('Chicken Leg', '🍗', 1050, 'food', [0, 0, 0, 5]);
const potion = itemFactory('Health Potion', '🧪', 22550, 'food', [0, 0, 0, 10]);
//🧦 👑

const items = [
  dagger,
  mace,
  sword,
  bow,
  axe,
  shield,
  head1,
  head2,
  head3,
  body1,
  body2,
  body3,
  legs1,
  legs2,
  legs3,
  apple,
  bread,
  meat,
  potion,
];
