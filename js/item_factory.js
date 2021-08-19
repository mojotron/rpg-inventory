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
const dagger = itemFactory('Dagger', '🔪', 1000, 'weapon', 1);
const mace = itemFactory('Wooden Mace', '🏏', 3000, 'weapon', 2);
const sward = itemFactory('Short Sword', '🗡️', 5000, 'weapon', 5);
const bow = itemFactory('Long Bow', '🏹', 10000, 'weapon', 7);
const axe = itemFactory('Big Axe', '🪓', 15000, 'weapon', 10);
const shield = itemFactory('Kite Shield', '🛡️', 7500, 'weapon', 8);
//Head
const legs1 = itemFactory('Cloth Cap', '🧢', 1750, 'armor', 1);
const legs1 = itemFactory('Light Helmet', '⛑️', 5500, 'armor', 4);
const legs1 = itemFactory('Heavy Helmet', '🪖', 8800, 'armor', 6);
//Body
const legs1 = itemFactory('Light Shirt', '🎽', 2750, 'armor', 2);
const legs1 = itemFactory('Heavy Shirt', '👕', 3550, 'armor', 3);
const legs1 = itemFactory('Body Armor', '🧥', 7250, 'armor', 5);
//Legs
const legs1 = itemFactory('Light Shoes', '👟', 2250, 'armor', 2);
const legs1 = itemFactory('Leather Shoes', '👞', 6400, 'armor', 4);
const legs1 = itemFactory('Heavy Boots', '🥾', 8250, 'armor', 6);
//🧦 👑
