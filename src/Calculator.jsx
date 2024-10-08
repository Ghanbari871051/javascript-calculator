import React from "react";
import Button from "./Button";
import Display from "./Display";

const Calculator = () => {
  const [input, setInput] = React.useState("0"); // مقدار فعلی نمایشگر
  const [operator, setOperator] = React.useState(null); // عملگر فعلی
  const [previousValue, setPreviousValue] = React.useState(null); // مقدار قبلی
  const [isResult, setIsResult] = React.useState(false); // برای شناسایی آیا نتیجه نهایی نمایش داده شده

  // مدیریت ورودی عددی
  const handleNumber = (num) => {
    if (isResult) {
      setInput(num); // در صورت نمایش نتیجه، عدد جدید جایگزین شود
      setIsResult(false);
    } else {
      setInput(input === "0" ? num : input + num); // اگر مقدار 0 است، عدد جدید را جایگزین می‌کند
    }
  };

  // مدیریت اعمال ریاضی
  const handleOperator = (op) => {
    if (previousValue) {
      calculate(); // در صورتی که مقدار قبلی موجود باشد، محاسبه انجام شود
    } else {
      setPreviousValue(parseFloat(input)); // مقدار فعلی به عنوان مقدار قبلی ذخیره شود
    }
    setOperator(op); // عملگر جدید تنظیم شود
    setInput("0"); // مقدار ورودی ریست شود
  };

  // محاسبه نتیجه
  const calculate = () => {
    let result;
    const current = parseFloat(input);
    switch (operator) {
      case "+":
        result = previousValue + current;
        break;
      case "-":
        result = previousValue - current;
        break;
      case "*":
        result = previousValue * current;
        break;
      case "/":
        result = previousValue / current;
        break;
      default:
        return;
    }
    setInput(result.toString());
    setPreviousValue(null);
    setOperator(null);
    setIsResult(true); // نتیجه نهایی نمایش داده شده است
  };

  // پاک کردن ورودی‌ها
  const clear = () => {
    setInput("0");
    setPreviousValue(null);
    setOperator(null);
  };

  // مدیریت ورود نقطه اعشار
  const handleDecimal = () => {
    if (!input.includes(".")) {
      setInput(input + ".");
    }
  };

  return (
    <div id="calculator">
      <Display value={input} />
      <div className="buttons">
        {/* دکمه‌های ماشین حساب */}
        <Button id="clear" value="AC" onClick={clear} />
        <Button id="divide" value="/" onClick={() => handleOperator("/")} />
        <Button id="multiply" value="*" onClick={() => handleOperator("*")} />
        <Button id="seven" value="7" onClick={() => handleNumber("7")} />
        <Button id="eight" value="8" onClick={() => handleNumber("8")} />
        <Button id="nine" value="9" onClick={() => handleNumber("9")} />
        <Button id="subtract" value="-" onClick={() => handleOperator("-")} />
        <Button id="four" value="4" onClick={() => handleNumber("4")} />
        <Button id="five" value="5" onClick={() => handleNumber("5")} />
        <Button id="six" value="6" onClick={() => handleNumber("6")} />
        <Button id="add" value="+" onClick={() => handleOperator("+")} />
        <Button id="one" value="1" onClick={() => handleNumber("1")} />
        <Button id="two" value="2" onClick={() => handleNumber("2")} />
        <Button id="three" value="3" onClick={() => handleNumber("3")} />
        <Button id="equals" value="=" onClick={calculate} />
        <Button id="zero" value="0" onClick={() => handleNumber("0")} />
        <Button id="decimal" value="." onClick={handleDecimal} />
      </div>
    </div>
  );
};

export default Calculator;
