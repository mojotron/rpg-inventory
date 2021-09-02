'use strict';
const monsterFactory = function (type, emoji, attack, armor, loot, rarity) {
  return { type, emoji, attack, armor, rarity, loot };
};

const skelton = monsterFactory(
  'Roaming Skeleton',
  '💀',
  1,
  1,
  [dagger, apple],
  0.4
);
const zombie = monsterFactory('Zombie', '🧟', 2, 3, [], 0);
const ghost = monsterFactory('Lost Ghost', '👻', 3, 2, [], 0);
const spider = monsterFactory('Giant Spider', '🕷️', 4, 5, [], 0);
const bear = monsterFactory('Rabies Bear', '🧸', 5, 9, [], 0);
const dino = monsterFactory('Razor-Rex', '🦖', 10, 6, [], 0);
const goblin = monsterFactory('Goblin', '👺', 7, 8, [], 0);
const ogre = monsterFactory('Ogre', '👹', 8, 10, [], 0);
const golem = monsterFactory('Forgotten Golem', '👾', 10, 10, [], 0);
const mage = monsterFactory('Twisted Mage', '🧙‍♂️', 15, 5, [], 0);
const dragon = monsterFactory('Dragon', '🐉', 15, 15, [], 0);

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

//make bonus items for rare enemis and remove some items from shop

// const combat = function (char, monster) {
//   if (char.getAttack() >= monster.armor && char.getArmor() > monster.attack) {
//     return monster.loot;
//   }
// };
//combat
//compare character attack and monster armor
//compare monsters attack and character armor
//if character have bigger attack and bigger armor slay monster and win loot
//if character have bigger attack but lower armor
//if character doesnt have bigger atack nor bigger armor
//if character have bigger armor but lower attack - monster ecapes
