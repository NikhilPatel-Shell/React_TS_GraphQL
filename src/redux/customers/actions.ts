import { Dispatch } from "redux"
import { Customer, CustomerListQuery, CustomerListQueryVariables } from "../../generated/graphql";
import { ActionTypes, Action } from "./types";


export const setCustomerList = (payload: Customer[]) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.SET_CUSTOMER_LIST, payload: payload })
}

export const fetchCustomerList = (payload: CustomerListQueryVariables) => (dispatch: Dispatch<Action>) => {
    dispatch({ type: ActionTypes.GET_CUSTOMER_LIST, payload: payload })
}