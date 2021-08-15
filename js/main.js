const loginCharName = document.querySelector('.login-user-character');
const loginCharPass = document.querySelector('.login-user-password');
const loginBtn = document.querySelector('.login-btn');
loginBtn.addEventListener('click', function (e) {
  e.preventDefault();
  //TODO
  if (loginCharName.value === 'Bob' && +loginCharPass.value === 111) {
    document.querySelector('.game-display').style.opacity = '1';
  }
  //Clear input
  loginCharName.value = '';
  loginCharPass.value = '';
  loginCharPass.blur();
  loginCharName.blur();
  //
});
