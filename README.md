# RPG-Inventory

Explore Rpg-inventory project [here](https://mojotron.github.io/rpg-inventory/index.html), via github pages.

**NOTE:** _For best user experience please use this application on desktop browser._

This project is inspired by a project from awesome tutorial [Complete Javascript Course](https://www.udemy.com/course/the-complete-javascript-course/) by Jonas Schmedtmann. I wanted to create something like [Bankist App Demo](https://bankist.netlify.app/)(user: js password: 1111) that is build in the tutorial, but not copying project.

Instead I made an imitation of RPG games character inventory management system with all common RPG game actions like buying or selling items, equipping gear and interacting with other players by sending them items or gold.

The goal of this project was to reinforce my knowledge, challenge myself with building projects that are not simple, forcing me to overcome difficulties and learn along the path.

## How To Play?

To start playing and exploring this project, simply login with a pre-made character or create a new one.
There are three pre-made characters to use, each with different gear to test game features, explore and have fun:

| character name | password |
| -------------- | :------: |
| Stomp          |   111    |
| Draw           |   222    |
| Slick          |   333    |

In addition to these characters, you can create a new one which starts with basic gear and two gold coins.

**NOTE**: _This application doesn't have option for saving characters progress at this point. All progress will be lost between page reloads._

**NOTE**: to inspect items in inventory or gear sections **double click on item** to open options box with information about item, and action options.

## Game features

1. Buying items - in the shop tab basic items are listed. To buy an item simply press buy item button.

**NOTE**: Shop contains most of the common items, not ALL. To get better gear there is Monster Hunt mini game which contains more items. The more rare a monster is, better gear can be obtained. There are common, rare, very and ultra rare items.

2. Selling items - user can sell an item at any point (no need to activate shop tab) from inventory or gear section.

3. Equip and remove item - to equip an item from inventory, inspect it and click equip. Gear slot must be empty (removed) before an item can be equipped. Two hand items requires both hands free. To remove an item from gear, open item in gear section and than remove button. To remove an item, there must be empty space in inventory.

4. Consume food - to regain health points consume food item by double clicking on it and then consume button.

5. Send item to other character - to send an item to another character, double click on it, type character name in input field and then click send button. If the other character has a full inventory or if you type wrong name, you will get friendly alert message.

6. Health point regeneration - in the bottom left corner there is a timer with heart. If a character is missing any health points, timer will start and regenerate 1 health point each 2 minutes.

7. Send coins to other character - next to the hit point regeneration counter is send coins form. With this form you can send some amount of coins to a friend character.

8. Inspect actions in action tab - every action you make in the game is recorded and displayed in the action tab.

9. Learn about monsters form monster tab - to learn all about possible monsters in Monster Hunt mini game, navigate to Monsterpedia tab and read all information for each monster including possible loot drop.

10. Monster hunt is a simple mini game, with the purpose of getting better gear than there is in the shop. Also, to add game economy, so that player can obtain coins by going to Monster hunt and sell items. Before, there was only sending gear or coins between character. Game logic follows four rules, based on comparison of player's attack with monster's armor and player's armor with monster's attack.

    | Monster Hunt combat rules                                                                                                      |
    | ------------------------------------------------------------------------------------------------------------------------------ |
    | Player that has greater attack and armor wins without getting any damage.                                                      |
    | Player whose attack is greater but armor is less then monster's wins but gets hit by monster attack - player armor difference. |
    | Player whose attack is less but armor is grater doesn't win loot and gets damage equal to half of players hit points           |

    |Monster that has greater attack and armor then player damages the player to one hit point.

    **NOTE**: When player has 1 hit point, you can't go to monster hunt. Before next round, you must consume food or wait for hit points to regenerate.|

## What have I learned?

- Creating DOM elements at mouse click position using MouseEvent.clientX and MouseEvent.clientY properties.
- Event delegation with event capturing and bubbling.
- Matching strategy for event delegation pattens.
- Timing events - creating, clearing, calling.
- Tick function to start timer immediately not after 1 second.
- Intl API - making action tab to display word today when action is made in past 24 hours, number of day (in format 1 day ago) when action is made past week or date string in format based on user location (formatting depends user county standards).
- Encapsulation - using factory functions for object creation. Placing code in module pattern saving global scope of namespace pollution.
- Encapsulation of event listeners creating init function, making all event listers in one place making code more readable.
- Css transition effects.
- Difficulties of implementing game logic - interaction between different game object. Importance of good planning and dividing task. How hard is to make a balanced game, making user progress enjoyable but not too easy or too hard.

## Biggest roadblocks?

By far the biggest problem was creating an item object that is easy to use in character and monster object.
Making coins works in whole code base. Here I was overthinking trying to work with gold, silver and coppers independently. The solution was to make helper functions that transform coin value to gold/silver/cooper for display purposes.
Encapsulate factory functions - I wanted this project without global variables.

## TO DO Features

Refactor character factory function - making prototype object for character and move most of logic there. Then using Object.create to make prototypal inheritance between these objects. Goal of this refactor is to simplify character object to implement localStorage API for saving users progress.

Style up page and make responsive.
