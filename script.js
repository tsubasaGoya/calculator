const calcDisplay = document.querySelector('h1');
const inputBtns = document.querySelectorAll('button');
const clearBtn = document.getElementById('clear-btn');
let decimalCount = 0;
let firstValue = 0;
let operatorValue = '';
let operatorProcessing = false;

function sendNumVal(value) {
    if (operatorProcessing) {
        calcDisplay.textContent = value;
        operatorProcessing = false;
    } else {
        const currentValue = calcDisplay.textContent;
        if (value === '.') {
            if (decimalCount < 1) {
                calcDisplay.textContent = currentValue === '0' ? value : currentValue + value;
            }
            decimalCount++;
        } else {
            // If display number is 0 then replace with number, otherwise add
            calcDisplay.textContent = currentValue === '0' ? value : currentValue + value;
        }
    }
}
// Calculate first and second values depending on oeperator
const calculate = {
    '/': (firstNum, secondNum) => firstNum / secondNum,
    '*': (firstNum, secondNum) => firstNum * secondNum,
    '+': (firstNum, secondNum) => firstNum + secondNum,
    '-': (firstNum, secondNum) => firstNum - secondNum,
    '=': (firstNum, secondNum) => secondNum
}
function operation(val) {
    const currentValue = Number(calcDisplay.textContent);
    decimalCount = 0;
    // prevent multiple operators
    if (operatorValue && operatorProcessing) {
        operatorValue = val;
        return;
    }
    // Assign first value if no value
    if (!firstValue) {
        firstValue = currentValue;
    } else {
        const calculation = calculate[operatorValue](firstValue, currentValue);
        calcDisplay.textContent = calculation;
        firstValue = calculation;
    }
    operatorProcessing = true;
    operatorValue = val;
}
// Clear Function
function resetNumber() {
    calcDisplay.textContent = '0';
    decimalCount = 0;
    firstValue = 0;
    operatorValue = '';
    operatorProcessing = false;
}
// Add Event Listeners for numbers, operators, decimal buttons
inputBtns.forEach((btn) => {
    if (btn.classList.contains('operator')) {
        btn.addEventListener('click', () => operation(btn.value));
    } else {
        btn.addEventListener('click', () => sendNumVal(btn.value));
    }
})
// Event Listener for clear calculation
clearBtn.addEventListener('click', resetNumber);