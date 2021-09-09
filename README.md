# RPG-Inventory

event.clientX event.clietY
transition
event delegation
timers

## How To Play?

There are three premade characters to use (username/password):

1. Stomp/111 - best geared of three
2. Draw/222 - middium geared
3. Slick/333 - low geared

User can create one or mutiple characters but there is no database for saving progres between page reload. Factory functionas are too complex for localStorage API.
Tu open item optiins use double click on item in invenory or equipment slots. Right click is more natural for rpg games but i didnt want to change brawsers defult functions with right click.
Action tab is used as game log for players moves.
Shop tab has items to buy, but some items are only obtainable through monster hunt.
Materpedia tab has informations about all munsters that player can find in monster hunt.
Monster hunt is very simple minigame where player rolls random number and depending on monsters rarity it will face that monster.
Game logic is simple, compare players attack with monsters armor and players armor with monsters attack.

- player have greatear attack and armor wins without geting any dmg
- attak is greatear but armor is less then monsters players wing but gets hit by attack/armor difference
- attack is less but arrmor is grater, no loot but player gets dmg of half hp
- monster has greater attack and armor - puts player to one hp
  When player has 1 hp cant go to monster hunt, must consume food or wait for hp regeneration timer.

You can send coins and gear between characters.

## What have I learned?

## Biggest roadblocks?

By far biggest problem was creating item object.
Encapsulate facories.
Local Storage.
