$(document).ready(function() {
  var currentNumber = 0;
  var lastNumber = 0;
  var operator = null;
  var result = 0;

  function updateDisplay() {
    if (result !== 0) {
      $(".display").text(result);
    } else if (operator !== null) {
      $(".display").text(lastNumber + " " + operator);
    } else {
      $(".display").text(currentNumber);
    }
  }

  function clearAll() {
    currentNumber = 0;
    lastNumber = 0;
    operator = null;
    result = 0;
    updateDisplay();
  }

  function clearLast() {
    currentNumber = 0;
    updateDisplay();
  }

  function calculate() {
    switch (operator) {
      case "+":
        result = lastNumber + currentNumber;
        break;
      case "-":
        result = lastNumber - currentNumber;
        break;
      case "*":
        result = lastNumber * currentNumber;
        break;
      case "/":
        if (currentNumber === 0) {
          result = "ERR";
        } else {
          result = lastNumber / currentNumber;
        }
        break;
      default:
        result = currentNumber;
    }
    currentNumber = 0;
    lastNumber = result;
    operator = null;
    updateDisplay();
  }

  $(".number").click(function() {
    if (currentNumber.toString().length < 8) {
      var number = $(this).text();
      if (number === "." && currentNumber.toString().includes(".")) {
        return;
      } else if (number === "." && currentNumber === 0) {
        currentNumber = "0.";
      } else if (currentNumber === 0) {
        currentNumber = number;
      } else {
        currentNumber += number;
      }
      updateDisplay();
    }
  });

  $(".operator").click(function() {
    var op = $(this).text();
    if (op === "AC") {
      clearAll();
    } else if (op === "C") {
      clearLast();
    } else if (op === "+/-") {
      currentNumber = -1 * currentNumber;
      updateDisplay();
    } else if (operator === null) {
      operator = op;
      lastNumber = currentNumber;
      currentNumber = 0;
      updateDisplay();
    } else {
      calculate();
      operator = op;
    }
  });

  $(".equals").click(function() {
    calculate();
  });
});
