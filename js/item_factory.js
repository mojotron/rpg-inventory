'use strict';
const itemFactory = function (name, emoji, value, type, bonus) {
  const getName = () => name;
  const getEmoji = () => emoji;
  const getValue = () => value;
  const downGrade = () => (value -= value * 10);
  const getType = () => type;
  const getBonus = () => bonus;
  return { getName, getEmoji, getValue, downGrade, getType, getBonus };
};
//Arms
const dagger = itemFactory('Dagger', '🔪', 10000, 'weapon', 1);
const mace = itemFactory('Wooden Mace', '🏏', 30000, 'weapon', 2);
const sward = itemFactory('Short Sword', '🗡️', 50000, 'weapon', 5);
const bow = itemFactory('Long Bow', '🏹', 100000, 'weapon', 7);
const axe = itemFactory('Big Axe', '🪓', 150000, 'weapon', 10);
const shield = itemFactory('Kite Shield', '🛡️', 75000, 'shield', 8);
//Head
const head1 = itemFactory('Cloth Cap', '🧢', 17500, 'head', 1);
const head2 = itemFactory('Light Helmet', '⛑️', 55000, 'head', 4);
const head3 = itemFactory('Heavy Helmet', '🪖', 88000, 'head', 6);
//Body
const body1 = itemFactory('Light Shirt', '🎽', 27500, 'body', 2);
const body2 = itemFactory('Heavy Shirt', '👕', 35500, 'body', 3);
const body3 = itemFactory('Body Armor', '🧥', 72500, 'body', 5);
//Legs
const legs1 = itemFactory('Light Shoes', '👟', 22500, 'legs', 2);
const legs2 = itemFactory('Leather Shoes', '👞', 64000, 'legs', 4);
const legs3 = itemFactory('Heavy Boots', '🥾', 82500, 'legs', 6);
//Consumables
const apple = itemFactory('Tasty Apple', '🍏', 1500, 'food', 1);
const bread = itemFactory('Aged Cheese', '🧀', 7500, 'food', 3);
const meat = itemFactory('Chicken Leg', '🍗', 10000, 'food', 5);
const potion = itemFactory('Health Potion', '🧪', 22500, 'food', 10);
//🧦 👑
