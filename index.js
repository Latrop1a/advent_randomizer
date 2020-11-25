//advent randomizer

myStorage = window.localStorage;

const initData = () => {
  const data = {
    doms: {},
    opened: [3, 7, 13],
    closed: [
      1,
      2,
      4,
      5,
      6,
      8,
      9,
      10,
      11,
      12,
      14,
      15,
      16,
      17,
      18,
      19,
      20,
      21,
      22,
      23,
    ],
  };

  //local storage settings
  localStorage.setItem("stuff", JSON.stringify(data));
};

//!this puts initial dataset into local storage
//initData();

const data = JSON.parse(window.localStorage.getItem("stuff"));

const chooseRandom = () => {
  if (data.closed.length > 0) {
    return data.closed[Math.round(Math.random() * (data.closed.length - 1))];
  } else {
    return 24;
  }
};

/* OLD complicated way
const chooseRandom = () => {
  let randomNumber = Math.round(Math.random() * 23 + 1);
  let closestNum = 1;
  data.closed.forEach((element) => {
    let diff = Math.abs(randomNumber - element);
    let oldDiff = Math.abs(randomNumber - closestNum);
    if (diff < oldDiff) {
      closestNum = element;
    }
  });
  console.log("random: " + randomNumber);
  console.log("closest: " + closestNum);
  return closestNum;
};
 */

const init = () => {
  data.opened.forEach((element) => {
    changeToOpened(element);
  });
};

const UIUpdate = (number) => {
  //show roll animation

  //display message
  document.getElementById("message").innerHTML = `Macht Nummer ${number} auf!`;
  //change icon and make glow
  changeToOpened(number);
  document.getElementById(`day-${number}`).classList.add("glow");
};

const changeToOpened = (number) => {
  //document.getElementById(`day-${number}`).src = "open.svg";
  document
    .getElementById(`day-${number}`)
    .classList.replace("fa-gift", "fa-gratipay");
  document.getElementById(`day-${number}`).classList.replace("fas", "fab");
};

//execute on button click
const roll = () => {
  //gets random element
  let rndNum = chooseRandom();
  console.log(rndNum);
  //removes element from closed array and add to opened
  data.closed.splice(data.closed.indexOf(rndNum), 1);
  data.opened.push(rndNum);
  //UIupdate
  UIUpdate(rndNum);
  localStorage.setItem("stuff", JSON.stringify(data));
};

init();

document.getElementById("btn-roll").addEventListener("click", roll);
