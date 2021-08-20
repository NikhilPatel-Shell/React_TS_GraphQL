import { Customer } from "../../generated/graphql";
import { ActionTypes, Action } from "./types";

interface CustomerState {
    list: Customer[]
}

const initialCustomerState = {
    list: [],
}

const customerReducer = (state: CustomerState = initialCustomerState, action: Action) => {
    switch (action.type) {
        case ActionTypes.SET_CUSTOMER_LIST:
            return {
                ...state,
                list: action.payload
            }
        default:
            return state;
    }
}


export default customerReducer;



