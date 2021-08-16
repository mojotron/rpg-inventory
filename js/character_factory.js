const characterFactory = function (userName, userPassword, classType) {
  const getName = () => userName;
  const getPassword = () => userPassword;
  //Character inventory
  const inventory = Array.from({ length: 9 }, () => null);
  const getInventory = () => inventory;
  //Character gear
  //object that

  //Currency
  // const currency = {
  //   gold: 10,
  //   silver: 0,
  //   copper: 0,
  // }

  //Character Actions

  return { getName, getPassword, getInventory };
};
