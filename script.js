const history = document.getElementById('calc-history');
const answer = document.getElementById('answer');
const buttons = document.querySelectorAll('button');

//-----------------------------------------
let num1;
let num2;
let operator;
let inputCalc = '';
let operatorClicked = false;

const addition = function (a, b) {
  return roundAndReduce(a + b);
};

const subtraction = function (a, b) {
  return roundAndReduce(a - b);
};

const multiply = function (a, b) {
  return roundAndReduce(a * b);
};

const division = function (a, b) {
  if (b === 0) {
    return '∞';
  }
  return roundAndReduce(a / b);
};

const roundAndReduce = function (answer) {
  if (Number.isInteger(answer)) {
    return answer;
  } else {
    return answer.toFixed(5);
  }
};

const operate = function (op, n1, n2) {
  if (op === '+') {
    return addition(n1, n2);
  } else if (op === '-') {
    return subtraction(n1, n2);
  } else if (op === 'x') {
    return multiply(n1, n2);
  } else if (op === '÷') {
    return division(n1, n2);
  }
};

//------------------------------------
// handles number inputs via buttons

const numberInput = function (e) {
  inputCalc = inputCalc + e.target.dataset.number;
  answer.textContent = inputCalc;
};

const allClear = function () {
  inputCalc = '';
  answer.textContent = inputCalc;
  history.textContent = inputCalc;
  operatorClicked = false;
};

const clearLast = function () {
  inputCalc = String(inputCalc);
  inputCalc = inputCalc.substring(0, inputCalc.length - 1);
  answer.textContent = inputCalc;
};

const operatorInput = function (e) {
  if (!operatorClicked) {
    operator = e.target.dataset.operator;
    num1 = Number(inputCalc);
    allClear();
    operatorClicked = true;
  } else {
    equals();
    operator = e.target.dataset.operator;
    num1 = Number(inputCalc);
    inputCalc = ''; // Clear the inputCalc string to start storing the value for num2
    operatorClicked = true;
  }
};

const equals = function () {
  if (
    event.target.dataset.equal ||
    (operatorClicked && event.target.dataset.operator)
  ) {
    num2 = Number(inputCalc);
    inputCalc = operate(operator, num1, num2);
    history.textContent = `${num1} ${operator} ${num2} = ${inputCalc}`;
    answer.textContent = inputCalc;
    operatorClicked = false;
  }
};

const buttonClick = function (event) {
  if (event.target.dataset.number) {
    numberInput(event);
  } else if (event.target.dataset.operator) {
    operatorInput(event);
  } else if (
    event.target.dataset.equal ||
    (operatorClicked && event.target.dataset.operator)
  ) {
    equals();
  } else if (event.target.textContent === 'AC') {
    allClear();
  } else if (event.target.textContent === 'C') {
    clearLast();
  }
};

//adds event listener to all buttons
buttons.forEach(function (button) {
  button.addEventListener('click', buttonClick);
});
