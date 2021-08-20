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
    gameApp.style.opacity = 1;
    //Clear input
    loginCharName.value = loginCharPass.value = '';
    loginCharPass.blur();
    loginCharName.blur();
  });
  //INVENTORY SLOTS
  //if have item, then on right click display possible options
})();
