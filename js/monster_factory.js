'use strict';
const Monster = (function () {
  const monsterFactory = function (type, emoji, attack, armor, loot, rarity) {
    const getLoot = function () {
      return loot[Math.floor(Math.random() * loot.length)];
    };
    return { type, emoji, attack, armor, rarity, loot, getLoot };
  };
  const skelton = monsterFactory(
    'Roaming Skeleton',
    '💀',
    1,
    1,
    [apple, cheese],
    30
  );
  const zombie = monsterFactory('Zombie', '🧟', 2, 2, [apple, meat], 40);
  const ghost = monsterFactory(
    'Lost Ghost',
    '👻',
    3,
    2,
    [apple, cheese, meat],
    50
  );
  const spider = monsterFactory(
    'Giant Spider',
    '🕷️',
    4,
    5,
    [apple, cheese, meat, dagger],
    60
  );
  const bear = monsterFactory(
    'Rabies Bear',
    '🧸',
    5,
    9,
    [dagger, head1, body1, legs1, mace, potion],
    70
  );
  const dino = monsterFactory(
    'Razor-Rex',
    '🦖',
    10,
    6,
    [dagger, head1, body1, legs1, mace, potion, sword],
    75
  );
  const goblin = monsterFactory(
    'Goblin',
    '👺',
    7,
    8,
    [mace, sword, potion, head2, body2, legs2],
    85
  );
  const ogre = monsterFactory(
    'Ogre',
    '👹',
    8,
    10,
    [mace, sword, potion, head2, body2, legs2, shield],
    90
  );
  const golem = monsterFactory(
    'Forgotten Golem',
    '👾',
    10,
    10,
    [head3, body3, legs3, potion, sword],
    95
  );
  const mage = monsterFactory(
    'Twisted Mage',
    '🧙‍♂️',
    15,
    5,
    [head3, body3, legs3, potion, shield],
    98
  );
  const dragon = monsterFactory(
    'Dragon',
    '🐉',
    15,
    15,
    [head3, body3, legs3, potion, sword, axe, bow, shield],
    100
  );

  const monsters = [
    skelton,
    zombie,
    ghost,
    spider,
    bear,
    dino,
    goblin,
    ogre,
    golem,
    mage,
    dragon,
  ];

  const generateMonster = function () {
    const rarity = Math.floor(Math.random() * 100) + 1;
    console.log(rarity);
    return monsters.find(monster => rarity <= monster.rarity);
  };

  return { monsters, generateMonster };
})();
