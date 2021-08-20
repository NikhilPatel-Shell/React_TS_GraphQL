import moment from 'moment';
import React, { useEffect, useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import { LINKS_PER_PAGE } from '../../constants';
import { useDispatch, useSelector } from "react-redux";
import { useCustomerListQuery } from "../../generated/graphql";
import { State, actionsCreators } from '../../redux';
import { bindActionCreators } from 'redux';

const CustomerList = () => {
  const history = useHistory();
  const location = useLocation();
  const [noMoreData, setNoMoreData] = useState(false)

  const dispatch = useDispatch();
  const { fetchCustomerList } = bindActionCreators(actionsCreators, dispatch)
  const customerList = useSelector<State, State["customer"]["list"]>(state => state.customer.list)

  const { data, loading, error, fetchMore } = useCustomerListQuery({
    variables: {
      limit: LINKS_PER_PAGE,
      skip: 0,
    },
    notifyOnNetworkStatusChange: true
  })

  useEffect(() => {
    fetchCustomerList({ limit: LINKS_PER_PAGE, skip: 0 });
  }, [fetchCustomerList])

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Customer Page</h1>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Customer Details</h1>
        <div className="btn-toolbar mb-2 mb-md-0">
          <button type="button" className="btn btn-sm btn-outline-secondary" onClick={() => history.push(`${location.pathname}/create`)}>
            Create New
          </button>
        </div>
      </div>

      <div className="table-responsive">
        <table className="table table-striped table-sm">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Email</th>
              <th scope="col">Phone No</th>
              <th scope="col">Comapny Name</th>
              <th scope="col">Comapny Type</th>
              <th scope="col">Country</th>
              <th scope="col">State</th>
              <th scope="col">City</th>
              <th scope="col">Postal</th>
              <th scope="col">Created At</th>
              <th scope="col">Last Updated</th>
            </tr>
          </thead>
          <tbody>
            {(loading && !data) &&
              <tr>
                <td colSpan={12}><div className="flex justify-content-center gray my-2">Loading Details...</div></td>
              </tr>
            }
            {(!loading && !data) &&
              <tr>
                <td colSpan={12}><div className="flex justify-content-center gray my-2">No Data</div></td>
              </tr>
            }
            {error &&
              <tr>
                <td colSpan={12}>
                  <div className="flex justify-content-center gray my-2">
                    <pre>{JSON.stringify(error, null, 2)}</pre>
                  </div>
                </td>
              </tr>
            }
            {data?.customers && (
              data?.customers.map(
                (cust) => (
                  <tr key={cust?.id.toString()}>
                    <td>{cust?.contact_name}</td>
                    <td>{cust?.contact_email}</td>
                    <td>{cust?.contact_phone}</td>
                    <td>{cust?.company_name}</td>
                    <td>{cust?.invoice_type}</td>
                    <td>{cust?.country}</td>
                    <td>{cust?.state}</td>
                    <td>{cust?.city}</td>
                    <td>{cust?.postal}</td>
                    <td>{moment(Number(cust?.createdAt)).format('MM-DD-YYYY')}</td>
                    <td>{moment(Number(cust?.updatedAt)).format('MM-DD-YYYY')}</td>
                  </tr>
                )
              )
            )
            }
          </tbody>
        </table>
      </div>
      {data?.customers?.length && (
        <div className={`flex justify-content-center my-3 ${noMoreData ? 'bg-light-gray' : 'bg-yellow'}`}>
          <div
            className="pointer p-3"
            onClick={() => {
              if (!noMoreData) {
                fetchMore({
                  variables: {
                    limit: LINKS_PER_PAGE,
                    skip: data!.customers!.length,
                  }
                }).then(fetchMoreResult => {
                  if (fetchMoreResult.data.customers!.length < LINKS_PER_PAGE) {
                    setNoMoreData(true)
                  }
                });
              }
            }}
          >
            {loading ? 'Loading More...' : 'Load More'}
          </div>
        </div>
      )
      }
    </>
  );
};

// const mapStateToProps = (store: State) => ({
//   List: store.customer,
// })

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   loadData: (payload: CustomerListQueryVariables) => dispatch(fetchCustomerList(payload))
// })

export default CustomerList;