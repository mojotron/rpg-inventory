'use strict';
const monsterFactory = function (type, emoji, attack, armor, loot, rarity) {
  return { type, emoji, attack, armor, rarity, loot };
};

const skelton = monsterFactory('Roaming Skeleton', '💀', 1, 1, [dagger], 0.1);
const zombie = monsterFactory('Zombie', '🧟', 2, 3, [dagger], 0.2);
const ghost = monsterFactory('Lost Ghost', '👻', 3, 2, [dagger], 0.3);
const spider = monsterFactory('Giant Spider', '🕷️', 4, 5, [dagger], 0.4);
const bear = monsterFactory('Rabies Bear', '🧸', 5, 9, [dagger], 0.5);
const dino = monsterFactory('Razor-Rex', '🦖', 10, 6, [dagger], 0.6);
const goblin = monsterFactory('Goblin', '👺', 7, 8, [dagger], 0.7);
const ogre = monsterFactory('Ogre', '👹', 8, 10, [dagger], 0.8);
const golem = monsterFactory('Forgotten Golem', '👾', 10, 10, [dagger], 0.9);
const mage = monsterFactory('Twisted Mage', '🧙‍♂️', 15, 5, [dagger], 0.95);
const dragon = monsterFactory('Dragon', '🐉', 15, 15, [dagger], 1);

const monsters = [
  skelton,
  zombie,
  ghost,
  ogre,
  goblin,
  dragon,
  golem,
  mage,
  bear,
  dino,
  spider,
];

const monsterHunt = function (char, monster) {
  if (char.getHP() === 1) {
    char;
  }
  if (char.getAttack() > monster.armor && char.getArmor() > monster.attack) {
  }
  if (char.getAttack() >= monster.armor && char.getArmor() <= monster.attack) {
  }
  if (char.getAttack() < monster.armor && char.getArmor() > monster.attack) {
  }
  if (char.getAttack() < monster.armor && char.getArmor() < monster.attack) {
  }
};
