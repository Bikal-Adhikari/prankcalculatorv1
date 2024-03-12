const displayElm = document.querySelector(".display");
const allBtns = document.querySelectorAll(".btn");

let strToDisplay = "";

const operators = ["%", "+", "-", "*", "/"];

let lastOperator = "";

const audio = new Audio("./audio.mp3");
allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    displayElm.classList.remove("prank");
    const value = btn.innerText;
    if (value === "AC") {
      strToDisplay = "";
      display();
      return;
    }

    if (value === "=") {
      //get the last character
      //check if it is the operator
      //if yes then remove it and update the display
      //if not, do nothing
      const lc = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lc)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
      return total();
    }

    if (value === "C") {
      strToDisplay = strToDisplay.slice(0, -1);
      return display(strToDisplay);
    }

    if (operators.includes(value)) {
      lastOperator = value;
      const lc = strToDisplay[strToDisplay.length - 1];
      if (operators.includes(lc)) {
        strToDisplay = strToDisplay.slice(0, -1);
      }
    }
    //if dot is there don't make it display  handle the dot issue
    if (value === ".") {
      const lastOperatorIndex = strToDisplay.lastIndexOf(lastOperator);
      const lastNumberSet = strToDisplay.slice(lastOperatorIndex);

      if (lastNumberSet.includes(".")) {
        return;
      }

      if (!lastOperator && strToDisplay.includes(".")) {
        return;
      }
    }
    strToDisplay += value;
    display(strToDisplay);
  });
});

const display = (str) => {
  displayElm.innerText = str || "0.0";
};

const total = () => {
  const extraVal = randomValue();
  if (extraVal) {
    displayElm.classList.add("prank");
    audio.play();
  }
  const ttl = eval(strToDisplay) + extraVal;
  strToDisplay = ttl.toString();
  display(ttl);
};

const randomValue = () => {
  const num = Math.round(Math.random() * 10);
  return num <= 3 ? num : 0;
};
