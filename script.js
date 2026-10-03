let current = "0",
  expr = "",
  operator = null,
  prevVal = null,
  justEvaled = false;

function updateDisplay() {
  const valEl = document.getElementById("val");
  const exprEl = document.getElementById("expr");
  const txt =
    current.length > 11 ? parseFloat(current).toExponential(4) : current;
  valEl.textContent = txt;
  valEl.style.fontSize =
    txt.length > 10 ? "22px" : txt.length > 7 ? "28px" : "38px";
  exprEl.textContent = expr;
}

function evaluate(a, b, op) {
  if (op === "+") return a + b;
  if (op === "−") return a - b;
  if (op === "×") return a * b;
  if (op === "÷") return b !== 0 ? a / b : NaN;
}

function format(n) {
  if (isNaN(n)) return "Error";
  return String(parseFloat(n.toFixed(10)));
}

function calc(key) {
  const ops = ["÷", "×", "−", "+"];

  if (key === "AC") {
    current = "0";
    expr = "";
    operator = null;
    prevVal = null;
    justEvaled = false;
  } else if (key === "+/-") {
    if (current !== "0")
      current = current.startsWith("-") ? current.slice(1) : "-" + current;
  } else if (key === "%") {
    current = format(parseFloat(current) / 100);
  } else if (ops.includes(key)) {
    if (operator && !justEvaled) {
      current = format(
        evaluate(parseFloat(prevVal), parseFloat(current), operator),
      );
    }
    prevVal = current;
    operator = key;
    expr = current + " " + key;
    current = "0";
    justEvaled = false;
  } else if (key === "=") {
    if (operator && prevVal !== null) {
      expr = prevVal + " " + operator + " " + current + " =";
      current = format(
        evaluate(parseFloat(prevVal), parseFloat(current), operator),
      );
      operator = null;
      prevVal = null;
      justEvaled = true;
    }
  } else if (key === ".") {
    if (justEvaled) {
      current = "0";
      justEvaled = false;
    }
    if (!current.includes(".")) current += ".";
  } else {
    if (current === "0" || justEvaled) {
      current = key;
      justEvaled = false;
    } else if (current.length < 12) current += key;
  }

  updateDisplay();
}

document.addEventListener("keydown", (e) => {
  const map = {
    0: "0",
    1: "1",
    2: "2",
    3: "3",
    4: "4",
    5: "5",
    6: "6",
    7: "7",
    8: "8",
    9: "9",
    ".": ".",
    Enter: "=",
    "=": "=",
    Backspace: "AC",
    "/": "÷",
    "*": "×",
    "-": "−",
    "+": "+",
  };
  if (map[e.key]) {
    e.preventDefault();
    calc(map[e.key]);
  }
});
