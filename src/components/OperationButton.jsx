import { ACTIONS } from "@/pages"

const OperationButton = ({dispatch, operation, child, className}) => {
    return <button onClick={() => dispatch({type:  ACTIONS.CHOOSE_OPERATION , payload:  {operation} })} className={className}>{child}</button>
}

export default OperationButton