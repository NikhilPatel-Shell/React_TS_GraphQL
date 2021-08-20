import { Customer, CustomerListQueryVariables } from "../../generated/graphql";

export enum ActionTypes {
    GET_CUSTOMER_LIST = "customers-GET_CUSTOMER_LIST",
    SET_CUSTOMER_LIST = "customers-SET_CUSTOMER_LIST",
};



interface GetCustomerList {
    type: ActionTypes.GET_CUSTOMER_LIST,
    payload: CustomerListQueryVariables
}

interface SetCustomerList {
    type: ActionTypes.SET_CUSTOMER_LIST,
    payload: Customer[]
}

export type Action = GetCustomerList | SetCustomerList;