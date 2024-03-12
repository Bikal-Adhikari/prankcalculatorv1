const displayElm = document.querySelector(".display");
const allBtns = document.querySelectorAll(".btn");

let strToDisplay = "";

const operators = ["%", "+", "-", "*", "/"];

let lastOperator = "";
allBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
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
  const ttl = eval(strToDisplay).toFixed(2);
  strToDisplay = ttl.toString();
  display(ttl);
};
