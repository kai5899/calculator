class CalculatorButton {
  constructor(numb, row) {
    this.element = $('<div class="button"></div>');

    this.numb = numb;

    this.row = row;
    this.shouldClear = false;
    this.numbElement = $(`<div class = "numText">${this.numb} </div>`);

    this.element.append(this.numbElement);

    this.row.element.append(this.element);

    this.onHover();

    this.onClick();
  }

//   updateInput(char) {
//     let display = $(".cal-text-area");
//     let currentValue = display.val();
//     const lastChar = currentValue[currentValue.length - 1];
  
//     // Handle Clear ('C')
//     if (char === 'C') {
//       this.row.calc.leftHand = "";
//       this.row.calc.rightHand = "";
//       this.row.calc.operator = "";
//       this.row.calc.result = "";
//       display.val("");
//       return;
//     }
  
//     // Prevent multiple consecutive operators (except minus for negative numbers)
//     if (this.checkOperator(char) && this.checkOperator(lastChar) && !(lastChar !== char && char === '-')) {
//       return; // Ignore multiple operators, except allow a minus sign after another operator for negative numbers
//     }
  
//     // Handle Decimal Point
//     if (this.isDecimalPoint(char)) {
//       if (currentValue === "" || this.isContainDecimal(currentValue)) {
//         return; // Ignore multiple decimals
//       }
//       display.val(currentValue + char);
//       return;
//     }
  
//     // Process Operators and Equals
//     if (this.checkOperator(char) && char !== '.') {
//       let calculator = this.row.calc;
//       console.log(char !== "=");
//       if (char !== "="){
//         $(".cal-text-area").val("00000");
//       } ;
//       if (calculator.leftHand === "" && currentValue !== "") {
//         calculator.leftHand = currentValue; // First number becomes left-hand operand
//         calculator.operator = char;
//         display.val("");
//       } else if (calculator.operator && currentValue !== "") {
//         calculator.rightHand = currentValue;
//         let expression = calculator.leftHand + calculator.operator + calculator.rightHand;
//         try {
//           calculator.result = math.evaluate(expression);
//           console.log(calculator.result);
//           display.val(calculator.result); // Display result of current operation
//           calculator.leftHand = calculator.result; // Start new operation with current result
//           calculator.operator = char === "=" ? "" : char; // Set new operator or clear if '=' was pressed
//           calculator.rightHand = "";
//         } catch (error) {
//           display.val("Error");
//           console.error("Calculation Error: ", error);
//         }
//         //  // Prepare for next number input
//       } else if (currentValue === "") {
//         // If no new number has been entered, update the operator
//         calculator.operator = char;
//       }
//       return;
//     }
  
//     // Normal Number Input
//     display.val(currentValue + char);
//   }
  
//   checkOperator(oper) {
//     var operList = ["/", "*", "+", "-", "="];
//     return operList.includes(oper);
//   }



updateInput(char) {
    let display = $(".cal-text-area");
    let currentValue = display.val();
    const lastChar = currentValue[currentValue.length - 1];
  
    // Handle Clear ('C')
    if (char === 'C') {
      this.row.calc.leftHand = "";
      this.row.calc.rightHand = "";
      this.row.calc.operator = "";
      this.row.calc.result = "";
      display.val("");
      return;
    }
  
    // Prevent multiple consecutive operators (except minus for negative numbers)
    if (this.checkOperator(char) && this.checkOperator(lastChar)) {
      if (char !== '-' || (char === '-' && lastChar === '-')) {
        return; // Prevent double operators, allow minus if not already negative following an operator
      }
    }
  
    // Handle Decimal Point
    if (this.isDecimalPoint(char)) {
      if (!this.isContainDecimal(currentValue)) {
        display.val(currentValue + char);
      }
      return;
    }
  
    // Process Operators and Equals
    if (this.checkOperator(char) && char !== '.') {
      let calculator = this.row.calc;
      if (calculator.leftHand === "") {
        calculator.leftHand = currentValue;
        calculator.operator = char;
        display.val("");
      } else if (calculator.operator) {
        if (calculator.rightHand !== "" || char === "=") {
          calculator.rightHand = currentValue;
          let expression = calculator.leftHand + calculator.operator + calculator.rightHand;
          try {
            calculator.result = math.evaluate(expression);
            display.val(calculator.result);
            calculator.leftHand = calculator.result;
            calculator.operator = char === "=" ? "" : char;
            calculator.rightHand = "";
          } catch (error) {
            display.val("Error");
            console.error("Calculation Error: ", error);
          }
        } else {
          // update operator if no right hand value yet
          calculator.operator = char;
        }
      }
      return;
    }
  
    // Normal Number Input
    display.val(currentValue + char);
  }
  
  checkOperator(oper) {
    var operList = ["/", "*", "+", "-", "="];
    return operList.includes(oper);
  }
  

  
  

  isDecimalPoint(char) {
    return char === ".";
  }

  isContainDecimal(val) {
    return val.includes(".");
  }

  onClick() {
    this.element.click(() => {
      this.updateInput(this.numb);
    });
  }

  onHover() {
    this.element.mouseenter(() => {
      this.element.addClass("button-hover");
      this.numbElement.addClass("numText-hover");
    });
    this.element.mouseleave(() => {
      this.element.removeClass("button-hover");
      this.numbElement.removeClass("numText-hover");
    });
  }
}

class CalculatorRow {
  constructor(calc) {
    this.element = $('<div class="cal-row"></div>');

    this.calc = calc;

    this.calc.element.append(this.element);
  }
}

class CalculatorInput {
  constructor(row) {
    this.element = $('<div class="cal-input"></div>');
    this.row = row;

    this.textArea = $('<input type="text" class="cal-text-area"></input>');

    this.element.append(this.textArea);
    this.row.element.append(this.element);
  }
}

class Calculator {
  constructor() {
    this.element = $('<div class = "calculator"></div>');


    this.leftHand = "";

    this.rightHand = "";

    this.operator = "";

    this.result = "";

    
  }
}

let cal = new Calculator();
let row4 = new CalculatorRow(cal);

let input = new CalculatorInput(row4);
let c = new CalculatorButton("C", row4);

let row3 = new CalculatorRow(cal);
let b7 = new CalculatorButton(7, row3);
let b8 = new CalculatorButton(8, row3);
let b9 = new CalculatorButton(9, row3);
let divide = new CalculatorButton("/", row3);

let row2 = new CalculatorRow(cal);
let b4 = new CalculatorButton(4, row2);
let b5 = new CalculatorButton(5, row2);
let b6 = new CalculatorButton(6, row2);
let multiply = new CalculatorButton("*", row2);

let row1 = new CalculatorRow(cal);
let b1 = new CalculatorButton(1, row1);
let b2 = new CalculatorButton(2, row1);
let b3 = new CalculatorButton(3, row1);
let minus = new CalculatorButton("-", row1);

let row0 = new CalculatorRow(cal);
let b0 = new CalculatorButton("0", row0);
let point = new CalculatorButton(".", row0);
let equal = new CalculatorButton("=", row0);
let plus = new CalculatorButton("+", row0);

let root = $(".root");

root.append(cal.element);

// root.append(row4.element);
// root.append(row3.element);
// root.append(row2.element);
// root.append(row1.element);
// root.append(row0.element);
