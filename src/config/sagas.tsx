import { takeEvery, put, call, StrictEffect } from "redux-saga/effects";
import { CustomerListQueryHookResult, CustomerListQueryVariables, useCustomerListQuery } from "../generated/graphql";
import { ActionTypes } from "../redux/customers/types";
import { setCustomerList } from "../redux/customers/actions";

// watchers
export default function* customerSaga(): Generator<StrictEffect> {
  yield takeEvery(ActionTypes.GET_CUSTOMER_LIST, getCustomerListWorker);
}

//  workers
export function* getCustomerListWorker(payload: CustomerListQueryVariables) {
  // loading, error, fetchMore
  const { data }: CustomerListQueryHookResult = yield call(useCustomerListQuery, {
    variables: {
      limit: payload.limit,
      ski: payload.skip,
    },
    notifyOnNetworkStatusChange: true
  })

  yield put(setCustomerList(data.customers))
}
