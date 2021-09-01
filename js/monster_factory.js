'use strict';
const monsterFactory = function (type, emoji, attack, armor, rarity, loot) {
  return { type, emoji, attack, armor, rarity, loot };
};

const skelton = monsterFactory('Roaming Skeleton', '💀', 1, 1, [], 0.4);
const zombie = monsterFactory('Zombie', '🧟', 1, 1, [], 0.4);
const ghost = monsterFactory('Lost Ghost', '👻', 1, 1, [], 0.4);
const ogre = monsterFactory('Ogre', '👹', 1, 1, [], 0.4);
const goblin = monsterFactory('Goblin', '👺', 1, 1, [], 0.4);
const dragon = monsterFactory('Dragon', '🐉', 1, 1, [], 0.4);
const golem = monsterFactory('Forgotten', '👾', 1, 1, [], 0.4);
const mage = monsterFactory('Twisted Mage', '🧙‍♂️', 1, 1, [], 0.4);
const bear = monsterFactory('Rabies Bear', '🧸', 1, 1, [], 0.4);
const dino = monsterFactory('Razor-Rex', '🦖', 1, 1, [], 0.4);
const spider = monsterFactory('Giant Spider', '🕷️', 1, 1, [], 0.4);

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
