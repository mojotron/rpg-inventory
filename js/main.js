'use strict';
//Game engin
(function () {
  let currentChar;
  //pre made characters
  const stomp = characterFactory('Stomp', 111);
  const cast = characterFactory('Cast', 222);
  const draw = characterFactory('Draw', 333);
  const characters = [stomp, cast, draw];
  //Selectors
  const gameApp = document.querySelector('.game-display');
  //login selectors
  const loginCharName = document.querySelector('.login-user-character');
  const loginCharPass = document.querySelector('.login-user-password');
  const loginBtn = document.querySelector('.login-btn');
  //Character ui selectors
  const charName = document.querySelector('.character-name');
  const charHP = document.querySelector('.character-hit-points');
  const charAttack = document.querySelector('.character-attack');
  const charArmor = document.querySelector('.character-armor');
  const charGold = document.querySelector('.currency-gold');
  const charSilver = document.querySelector('.currency-silver');
  const charCopper = document.querySelector('.currency-copper');
  //LOG IN USER
  loginBtn.addEventListener('click', function (e) {
    e.preventDefault();
    //Find character
    currentChar = characters.find(
      char => char.getName() === loginCharName.value
    );
    if (currentChar?.getPassword() === +loginCharPass.value) {
      //Update Char stats UI
      charName.textContent = currentChar.getName();
      charHP.textContent = currentChar.getHitPoints();
      charAttack.textContent = currentChar.getAttack();
      charArmor.textContent = currentChar.getArmor();
      charGold.textContent = currentChar.getCurrency()[0];
      charSilver.textContent = currentChar.getCurrency()[1];
      charCopper.textContent = currentChar.getCurrency()[2];
      //Update Char Gear
      for (const [key, value] of Object.entries(currentChar.getGear())) {
        const gearEl = document.querySelector(`[data-${key}=""]`);
        gearEl.textContent = value;
      }
      //Update Char Inventory
      currentChar.getInventory().forEach(function (slot, i) {
        const slotEl = document.querySelector(`[data-slot="${i}"]`);
        slotEl.textContent = slot;
      });
      //
      gameApp.style.opacity = 1;
    }
    //Clear input
    loginCharName.value = loginCharPass.value = '';
    loginCharPass.blur();
    loginCharName.blur();
  });
})();
