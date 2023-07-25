import CircleToggle from "@/components/ToggleCircle.jsx";
import { useStateContext } from "@/contextprovider/ContextProvider";
import { useEffect, useReducer } from "react";
import BodyClassName from "react-body-classname";
import DigitButton from "@/components/DigitButton";
import OperationButton from "@/components/OperationButton";

export const ACTIONS = {
  ADD_DIGITS: "add-digit",
  CHOOSE_OPERATION: "choose-operation",
  RESET: "reset",
  DELETE_DIGIT: "delete-digit",
  EQUALS: "equals",
};

const evaluate = ({ currentOperand, previousOperand, operation }) => {
  const prev = parseFloat(previousOperand);
  const curr = parseFloat(currentOperand);
  if (isNaN(prev) || isNaN(curr)) return "";
  let computation = "";
  switch (operation) {
    case "+":
      computation = prev + curr;
      break;
    case "-":
      computation = prev - curr;
      break;
    case "/":
      computation = prev / curr;
      break;
    case "*":
      computation = prev * curr;
      break;
  }

  return computation.toString();
};

const stateOperations = (state, { type, payload }) => {
  switch (type) {
    case ACTIONS.ADD_DIGITS:
      if (state.overwrite)
        return { ...state, currentOperand: payload.digit, overwrite: false };
      if (payload.digit === "0" && state.currentOperand === "0") return state;
      if (payload.digit === "." && state.currentOperand.includes("."))
        return state;
      return {
        ...state,
        currentOperand: `${state.currentOperand || ""}${payload.digit}`,
      };
    case ACTIONS.RESET:
      return {};
    case ACTIONS.CHOOSE_OPERATION:
      if (state.currentOperand == null && state.previousOperand == null)
        return state;
      if (state.currentOperand == null)
        return { ...state, operation: payload.operation };
      if (state.previousOperand == null) {
        return {
          ...state,
          operation: payload.operation,
          previousOperand: state.currentOperand,
          currentOperand: null,
        };
      }
      return {
        ...state,
        previousOperand: evaluate(state),
        operation: payload.operation,
        currentOperand: null,
      };
    case ACTIONS.EQUALS:
      if (
        state.operation === null ||
        state.currentOperand === null ||
        state.previousOperand === null
      )
        return state;
      return {
        ...state,
        previousOperand: null,
        operation: null,
        currentOperand: evaluate(state),
      };
    case ACTIONS.DELETE_DIGIT:
      if (state.overwrite)
        return { ...state, overwrite: false, currentOperand: null };
      if (state.currentOperand == null) return state;
      if (state.currentOperand.length === 1)
        return { ...state, currentOperand: null };
      return { ...state, currentOperand: state.currentOperand.slice(0, -1) };
    default:
      return state;
  }
};

const INTEGER_FORMAT = new Intl.NumberFormat("en-us", {
  maximumFractionDigits: 0,
});

const formatOperands = (operand) => {
  if (operand == null) return;
  const [integer, decimal] = operand.split(".");
  if (decimal == null) return INTEGER_FORMAT.format(integer);
  return `${INTEGER_FORMAT.format(integer)}.${decimal}`;
};

const Home = () => {
  const { isTheme, setIsTheme } = useStateContext();

  const onValueChange = (event) => {
    setIsTheme(event.target.value);
  };

  const theme1 = "-translate-x-[20px] md:-translate-x-[30px] bg-redkeybgtggl";
  const theme2 = "translate-x-[0px] md:translate-x-[0px] bg-orange-key";
  const theme3 = "translate-x-[20px] md:translate-x-[30px] bg-pure-cyan";

  const key1 =
    " bg-lightgrayishorangekeybg group-hover:bg-lightgrayishorangekey-hover";
  const key1Shadow = " bg-grayishorangekeyshadow";
  const key2 =
    " bg-light-grayish-yellow group-hover:bg-light-grayish-yellow-hover";
  const key2Shadow = "bg-dark-grayish-orange";
  const key3 = " bg-very-dark-violet group-hover:bg-very-dark-violet-hover";
  const key3Shadow = " bg-dark-magenta";

  const [{ currentOperand, previousOperand, operation }, dispatch] = useReducer(
    stateOperations,
    {}
  );

  return (
    <BodyClassName
      className={` ${
        isTheme === "theme-one"
          ? "bg-verydarkdesaturatedblue-main"
          : isTheme === "theme-two"
          ? "bg-lightgray-mainbg"
          : isTheme === "theme-three"
          ? "bg-very-dark-violet-main"
          : "bg-verydarkdesaturatedblue-main"
      } transition ease-out`}
    >
      <div
        className={`w-[375px] mx-auto md:w-[1440px] h-screen flex justify-center items-center transition ease-linear ${
          isTheme === "theme-one"
            ? "text-white"
            : isTheme === "theme-two"
            ? "text-very-dark-grayish-yellow"
            : isTheme === "theme-three"
            ? " text-light-yellow"
            : "text-white"
        }`}
      >
        <div className="mx-auto w-[540px] space-y-[24px]">
          <div className="space-y-[4px]">
            <div className="w-full font-bold text-[12px] -translate-x-[6px] gap-[16px] flex justify-end items-center md:gap-[24px] md:-translate-x-[12px] md:text-[14px]">
              <h4>1</h4>
              <h4>2</h4>
              <h4>3</h4>
            </div>
            <div className="flex justify-between items-center">
              <h3 className=" text-3xl font-bold">calc</h3>
              <div className=" flex justify-center items-center gap-[12px] md:gap-[26px]">
                <h3 className=" text-[10px] md:text-[12px] font-bold">THEME</h3>
                <form
                  className={`relative rounded-full p-[4px] flex justify-center items-center gap-[4px] md:gap-[12px] md:p-[9px] ${
                    isTheme === "theme-one"
                      ? "bg-verydarkdesaturatedblue-tggl-bg"
                      : isTheme === "theme-two"
                      ? "bg-grayish-red"
                      : isTheme === "theme-three"
                      ? "bg-very-dark-violet-screen"
                      : "bg-verydarkdesaturatedblue-tggl-bg"
                  }`}
                  onSubmit={(event) => event.preventDefault()}
                >
                  <CircleToggle
                    toggleCircle={
                      isTheme === "theme-one"
                        ? theme1
                        : isTheme === "theme-two"
                        ? theme2
                        : isTheme === "theme-three"
                        ? theme3
                        : theme1
                    }
                  />
                  <input
                    className="z-10 opacity-0 h-[16px] w-[16px] md:h-[18px] md:w-[18px] cursor-pointer"
                    type="radio"
                    value={"theme-one"}
                    checked={isTheme === "theme-one"}
                    onChange={onValueChange}
                  />
                  <input
                    className="z-10 opacity-0 h-[16px] w-[16px] md:h-[18px] md:w-[18px]] cursor-pointer"
                    type="radio"
                    value={"theme-two"}
                    checked={isTheme === "theme-two"}
                    onChange={onValueChange}
                  />
                  <input
                    className="z-10 opacity-0 h-[16px] w-[16px] md:h-[18px] md:w-[18px] cursor-pointer"
                    type="radio"
                    value={"theme-three"}
                    checked={isTheme === "theme-three"}
                    onChange={onValueChange}
                    onClick={(e) => setIsTheme(e.target.value)}
                  />
                </form>
              </div>
            </div>
          </div>
          <div
            className={`w-full h-[85px] md:h-[110px] rounded-xl ${
              isTheme === "theme-one"
                ? "bg-verydarkdesaturatedblue-scrn"
                : isTheme === "theme-two"
                ? "bg-very-light-gray text-very-dark-grayish-yellow"
                : isTheme === "theme-three"
                ? "bg-very-dark-violet-screen text-light-yellow"
                : "bg-verydarkdesaturatedblue-scrn"
            } p-[12px] px-[24px] md:p-[24px] text-4xl md:text-5xl font-bold flex flex-col justify-start items-end`}
          >
            <div>
              <div
                className={`${
                  isTheme === "theme-one"
                    ? "text-white opacity-70"
                    : isTheme === "theme-two"
                    ? "text-very-dark-grayish-yellow opacity-70"
                    : isTheme === "theme-three"
                    ? "text-light-yellow opacity-70"
                    : "text-white"
                } text-sm md:text-base w-full flex justify-end items-center`}
              >
                {formatOperands(previousOperand)} {operation}
              </div>
              <div>{formatOperands(currentOperand)}</div>
            </div>
          </div>
          <div
            className={`w-full p-[16px] md:p-[28px] font-black ${
              isTheme === "theme-one"
                ? "bg-verydarkdesaturatedblue-tggl-bg text-very-dark-grayish-blue"
                : isTheme === "theme-two"
                ? "bg-grayish-red text-very-dark-grayish-yellow"
                : isTheme === "theme-three"
                ? "bg-very-dark-violet-screen text-light-yellow"
                : "bg-verydarkdesaturatedblue-tggl-bg"
            } rounded-xl flex justify-center items-center flex-wrap gap-[16px] md:gap-[28px]`}
          >
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={7}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={8}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={9}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <button
                onClick={() => dispatch({ type: ACTIONS.DELETE_DIGIT })}
                className={`z-10 w-full h-full rounded-lg text-white text-[24px] md:text-[32px] flex justify-center items-center  transition ease-in ${
                  isTheme === "theme-one"
                    ? "bg-desaturateddarkbluebg group-hover:bg-desaturateddarkblue-hover"
                    : isTheme === "theme-two"
                    ? "bg-dark-moderate-cyan group-hover:bg-dark-moderate-cyan-hover"
                    : isTheme === "theme-three"
                    ? "bg-dark-violet group-hover:bg-dark-violet-hover"
                    : "bg-desaturateddarkbluebg group-hover:bg-desaturateddarkblue-hover"
                }`}
              >
                DEL
              </button>
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? "bg-desaturateddarkblueshadow"
                    : isTheme === "theme-two"
                    ? "bg-very-dark-cyan"
                    : isTheme === "theme-three"
                    ? "bg-vivid-magenta"
                    : " bg-desaturateddarkblueshadow"
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={4}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={5}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={6}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <OperationButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                operation="+"
                child="+"
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={1}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={2}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={3}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <OperationButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                operation="-"
                child="-"
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit="."
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <DigitButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                digit={0}
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <OperationButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                operation="/"
                child="/"
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[70px] h-[80px] md:w-[100px] md:h-[60px] flex justify-center items-center group">
              <OperationButton
                dispatch={dispatch}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? key1
                    : isTheme === "theme-two"
                    ? key2
                    : isTheme === "theme-three"
                    ? key3
                    : key1
                }`}
                operation="*"
                child="X"
              />
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? key1Shadow
                    : isTheme === "theme-two"
                    ? key2Shadow
                    : isTheme === "theme-three"
                    ? key3Shadow
                    : key1Shadow
                }`}
              ></div>
            </div>
            <div className="relative w-[45%] md:w-[47%] h-[60px] flex justify-center items-center group">
              <button
                onClick={() => dispatch({ type: ACTIONS.RESET })}
                className={`z-10 w-full h-full rounded-lg text-white text-[24px] md:text-[32px] flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? "bg-desaturateddarkbluebg group-hover:bg-desaturateddarkblue-hover"
                    : isTheme === "theme-two"
                    ? " bg-dark-moderate-cyan group-hover:bg-dark-moderate-cyan-hover"
                    : isTheme === "theme-three"
                    ? " bg-dark-violet group-hover:bg-dark-violet-hover"
                    : "bg-desaturateddarkbluebg group-hover:bg-desaturateddarkblue-hover"
                }`}
              >
                RESET
              </button>
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? "bg-desaturateddarkblueshadow"
                    : isTheme === "theme-two"
                    ? " bg-very-dark-cyan"
                    : isTheme === "theme-three"
                    ? "bg-dark-magenta"
                    : "bg-desaturateddarkblueshadow"
                }`}
              ></div>
            </div>
            <div className="relative w-[45%] md:w-[47%] h-[60px] flex justify-center items-center group">
              <button
                onClick={() => dispatch({ type: ACTIONS.EQUALS })}
                className={`z-10 w-full h-full rounded-lg flex justify-center items-center transition ease-in ${
                  isTheme === "theme-one"
                    ? "bg-redkeybgtggl group-hover:bg-redkeybgtggl-hover text-white"
                    : isTheme === "theme-two"
                    ? "bg-orange-key group-hover:bg-orange-key-hover text-white"
                    : isTheme === "theme-three"
                    ? "bg-pure-cyan group-hover:bg-pure-cyan-hover text-very-dark-grayish-yellow"
                    : "bg-redkeybgtggl group-hover:bg-redkeybgtggl-hover text-white"
                }`}
              >
                =
              </button>
              <div
                className={`absolute w-full h-full rounded-lg translate-y-[4px] ${
                  isTheme === "theme-one"
                    ? "bg-darkredkeyshadow"
                    : isTheme === "theme-two"
                    ? "bg-dark-orange"
                    : isTheme === "theme-three"
                    ? "bg-soft-cyan"
                    : "bg-darkredkeyshadow"
                }`}
              ></div>
            </div>
          </div>
        </div>
      </div>
    </BodyClassName>
  );
};

export default Home;
