let btn = document.getElementsByClassName("btn");
let screen = document.getElementById("screen");
let input = document.getElementById("input");

const returnEval = (arg) => {
  return eval(`"use strict"; (${arg})`);
};

for (const item of btn) {
  item.addEventListener("click", (e) => {
    let btnText = e.target.innerText;

    // clear the old result
    if (input.value) {
      input.value = "";
      screen.value = "";
    }

    if (btnText == "AC") {
      btnText = "";
      screen.value = "";
    }

    if (btnText == "√") {
      btnText = "√";
    }

    if (btnText == "÷") {
      btnText = "/";
    }
    if (btnText == "×") {
      btnText = "*";
    }

    if (btnText == "+/-") {
      btnText = "";
      screen.value = -returnEval(screen.value);
    }

    screen.value = screen.value + btnText;
  });
}



function convertToString(input) {
  try {
    input = input.replace(/\^/g, "**");
    input = input.replace(/√/g, "Math.sqrt");
    input = input.replace(/Math.sqrt(\d+)/g, "Math.sqrt($1)");
    console.log(input)
  } catch (err) {
    screen.value = "Error"
  }
  return input
};

function backspc() {
  screen.value = screen.value.slice(0, -1);
};

function calculatePercentage() {
  try {
    let result = returnEval(screen.value) / 100;
    input.value = `${screen.value}%`
    screen.value = result;
  } catch (err) {
    screen.value = "Error"
  }
}

function inverse() {
  try {
    let result = returnEval(screen.value)
    if (result !== 0)
      result = 1 / returnEval(screen.value)
    else
      window.alert("Denominator can't be zero")
    input.value = `1/${screen.value}`;
    screen.value = result;
  } catch (err) {
    screen.value = "Error"
  }
}

function CE() {
  let current = screen.value;
  let result = current.replace(/(\b\d+(\.\d+)?|\b\d+)\s*$/g, "")
  screen.value = result.trim();
}

const getResult = () => {
  try {
    input.value = screen.value;
    screen.value = returnEval(convertToString(screen.value)) || "error"
  } catch (err) {
    screen.value = "Error"
  }
};
