# RPG-Inventory

This project is inspired by awesome tutorial Complete Javascript Course by Jonas Schmedtmann and his version of Pig game. To challenge myself, instead of recreating whole project, i added a twist with 20 sided die and couple of more rules in game logic. Here is reference to original pig game. Goal of this project is reinforce my knowledge at the current learning path. I tried to use all tricks I learned in my other projects, to nail them down in brain.

Goal of this project was to implement all my learning with little bit defcual project. Idea for d this project is result from going through Jonas S tutoraial.
There is used for learning bankist app. I didnt want to copy whole project but to make it with a liitle twist.
For best user experience please use this application on desktop browser.

## How To Play?

There are three pre-made characters to use (username/password):

1. Stomp / 111
2. Draw / 222
3. Slick / 333

Every pre-made character have have different gear to test game features, explore and have fun!

In addition to these character you can create new one which starts with basic gear and some coins. This application doesn't have option for saving character progress. Character object is too complex for localStorage API.

Note: to inspect items in inventory or gear sections double click on item to open options box with informations about item.

## Game features:

1. Buying items form shop tab - In the shop tab, basic items are listed. To buy an item simply press buy item button.

2. Selling item - double click on item and then sell button to sell item and get coins.

3. Equip and remove item - to equip item from inventory double click on item and then equip. Gear slot item must be empty (removed) before item can be equiped. Two hand items requires boat hands free. To remove item from gear double click on item in gear section and than remove button. There must be empty spot in inventory.

4. Consume food - to regain health points consume food item by double click on item and then consume button.

5. Send item to other character - sending item to other character is bouble click on item and then type character name in inputs field and then click send button. If character have full invenory or you type wrong name you will get friendly alert message.
6. Health point regeneration - in the bottom left corner there is timer with heart. If character is missing any health point timer will start and regenerate 1 health point each 2 minutes.

7. Send coins to other character - next to the hit point regeneration counter is send coins form. With this form you can send some amount of coins to a friend character.

8. Inspect actions in action tab - every action you make in game is recorded and displayed in action tab.

9. Learn about monsters form monster tab - to learn all about posible monsters in Moster Hunt minigame navigate to Monsterpedia tab and read all information for each monster including possible loot drop.

10. Go to Monster hunt
    Monster hunt is simple mini game, with purpose of getting charater new gear and making game ecnomy. There was only sendding gear or coins between character prior.
    Game logic fallow these ruls, compare players attack with monsters armor and players armor with monsters attack.

- player have greatear attack and armor wins without geting any dmg
- attak is greatear but armor is less then monsters players wing but gets hit by attack/armor difference
- attack is less but arrmor is grater, no loot but player gets dmg of half hp
- monster has greater attack and armor - puts player to one hp
  When player has 1 hp cant go to monster hunt, must consume food or wait for hp regeneration timer.

## What have I learned?

- Creating DOM elements at mouse click position using MouseEvent.clientX and MouseEvent.clientY properties.
- Event delegation with event capturing and bubbling.
- Matching strategy for event delegation pattens.
- Timnig events - creating, clearing, calling.
- Tick function to start timer imidiatly not after 1 second.
- Intenatonalization API.
- Encapsulation -
- Enncapsulation of event listeners creating init function.
- Css transition effects.
- Difficulties of implementig game logic - interaction between different game object. Importance of good planning and dividing task.
- Balancing game - making natural curve of caracter progresin through game.

## Biggest roadblocks?

By far biggest problem was creating item object.
Encapsulate facories.
Local Storage.
Coin function.
Balancig caharacter, item and monster.
