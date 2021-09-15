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
    [
      Armory.shop.apple,
      Armory.shop.cheese,
      Armory.shop.meat,
      Armory.special.socks,
    ],
    30
  );
  const zombie = monsterFactory(
    'Zombie',
    '🧟',
    2,
    2,
    [Armory.shop.apple, Armory.shop.meat, Armory.special.socks],
    40
  );
  const ghost = monsterFactory(
    'Lost Ghost',
    '👻',
    3,
    2,
    [
      Armory.shop.apple,
      Armory.shop.cheese,
      Armory.shop.meat,
      Armory.special.socks,
      Armory.shop.dagger,
    ],
    50
  );
  const spider = monsterFactory(
    'Giant Spider',
    '🕷️',
    4,
    5,
    [
      Armory.shop.apple,
      Armory.shop.cheese,
      Armory.shop.meat,
      Armory.shop.dagger,
      Armory.special.socks,
      Armory.special.kimono,
      Armory.shop.sword,
    ],
    60
  );
  const bear = monsterFactory(
    'Rabies Bear',
    '🧸',
    5,
    9,
    [
      Armory.shop.dagger,
      Armory.shop.head1,
      Armory.shop.body1,
      Armory.shop.legs1,
      Armory.shop.mace,
      Armory.shop.potion,
      Armory.special.legion,
      Armory.special.hammer,
      Armory.special.bow,
      Armory.special.kimono,
    ],
    70
  );
  const dino = monsterFactory(
    'Razor-Rex',
    '🦖',
    10,
    6,
    [
      Armory.shop.dagger,
      Armory.shop.head2,
      Armory.shop.body2,
      Armory.shop.legs2,
      Armory.shop.mace,
      Armory.shop.potion,
      Armory.shop.sword,
      Armory.special.legion,
      Armory.special.axe,
      Armory.special.shield,
    ],
    75
  );
  const goblin = monsterFactory(
    'Goblin',
    '👺',
    7,
    8,
    [
      Armory.shop.potion,
      Armory.special.head3,
      Armory.special.body3,
      Armory.special.legs3,
      Armory.special.bow,
      Armory.special.axe,
      Armory.special.hammer,
      Armory.special.pickAxe,
    ],
    85
  );
  const ogre = monsterFactory(
    'Ogre',
    '👹',
    8,
    10,
    [
      Armory.special.head3,
      Armory.special.body3,
      Armory.special.legs3,
      Armory.special.shield,
      Armory.special.legion,
      Armory.special.hammer,
      Armory.special.pickAxe,
    ],
    90
  );
  const golem = monsterFactory(
    'Forgotten Golem',
    '👾',
    10,
    10,
    [
      Armory.special.head3,
      Armory.special.body3,
      Armory.special.legs3,
      Armory.shop.potion,
      Armory.shop.sword,
      Armory.special.socks,
      Armory.special.crown,
      Armory.special.legion,
      Armory.special.hammer,
      Armory.special.axe,
    ],
    95
  );
  const mage = monsterFactory(
    'Twisted Mage',
    '🧙‍♂️',
    15,
    5,
    [
      Armory.special.crown,
      Armory.special.pickAxe,
      Armory.special.trident,
      Armory.special.axe,
      Armory.special.bow,
      Armory.special.shield,
      Armory.special.legion,
      Armory.special.hammer,
    ],
    98
  );
  const dragon = monsterFactory(
    'Dragon',
    '🐉',
    15,
    15,
    [Armory.special.crown, Armory.special.trident],
    100
  );
  //prettier-ignore
  const monsters = [
    skelton, zombie, ghost, spider, bear,
    dino, goblin,ogre,golem,mage,dragon,
  ];

  const generateMonster = function () {
    const rarity = Math.floor(Math.random() * 100) + 1;
    return monsters.find(monster => rarity <= monster.rarity);
  };

  return { monsters, generateMonster };
})();
