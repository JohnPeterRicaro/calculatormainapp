import { ACTIONS } from "@/pages"

const DigitButton = ({dispatch , digit, className}) => {
    return <button onClick={() => dispatch({type:  ACTIONS.ADD_DIGITS, payload: { digit }})} className={className}>{digit}</button>
}

export default DigitButton