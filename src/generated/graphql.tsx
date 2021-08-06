import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions =  {}
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Customer = {
  __typename?: 'Customer';
  adder_per_gallon?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  contact_email?: Maybe<Scalars['String']>;
  contact_name?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  discount_per_gallon?: Maybe<Scalars['String']>;
  fuel_price_per_gallon?: Maybe<Scalars['String']>;
  fuel_price_tax_rate?: Maybe<Scalars['String']>;
  fuel_price_type?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invoice_type?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type File = {
  __typename?: 'File';
  encoding: Scalars['String'];
  filename: Scalars['String'];
  id: Scalars['ID'];
  mimetype: Scalars['String'];
};

export type Invoice = {
  __typename?: 'Invoice';
  batch_id?: Maybe<Scalars['String']>;
  business_order_id?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  customer_id?: Maybe<Scalars['String']>;
  fuel_price?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invoice_date?: Maybe<Scalars['String']>;
  invoice_fuel_amount?: Maybe<Scalars['String']>;
  invoice_gals?: Maybe<Scalars['String']>;
  invoice_sales_tax?: Maybe<Scalars['String']>;
  invoice_service_fee?: Maybe<Scalars['String']>;
  invoice_subtotal?: Maybe<Scalars['String']>;
  invoice_total?: Maybe<Scalars['String']>;
  processed?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
  voyager_error_codes?: Maybe<Scalars['String']>;
  voyager_settlement_date?: Maybe<Scalars['String']>;
  voyager_settlement_status?: Maybe<Scalars['String']>;
  voyager_submitted_date?: Maybe<Scalars['String']>;
};

export type Mutation = {
  __typename?: 'Mutation';
  addCustomer: Customer;
  singleFileUpload: File;
};


export type MutationAddCustomerArgs = {
  input: AddCustomer;
};


export type MutationSingleFileUploadArgs = {
  file: Scalars['Upload'];
};

export type Query = {
  __typename?: 'Query';
  customerByEmail?: Maybe<Customer>;
  customers?: Maybe<Array<Maybe<Customer>>>;
  invoices?: Maybe<Array<Maybe<Invoice>>>;
};


export type QueryCustomerByEmailArgs = {
  id?: Maybe<Scalars['ID']>;
};


export type QueryCustomersArgs = {
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
};


export type AddCustomer = {
  adder_per_gallon?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  contact_email?: Maybe<Scalars['String']>;
  contact_name?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  discount_per_gallon?: Maybe<Scalars['String']>;
  fuel_price_per_gallon?: Maybe<Scalars['String']>;
  fuel_price_tax_rate?: Maybe<Scalars['String']>;
  fuel_price_type?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invoice_type?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
};

export type AddCustomerMutationVariables = Exact<{
  adder_per_gallon?: Maybe<Scalars['String']>;
  address1?: Maybe<Scalars['String']>;
  address2?: Maybe<Scalars['String']>;
  city?: Maybe<Scalars['String']>;
  company_name?: Maybe<Scalars['String']>;
  contact_email?: Maybe<Scalars['String']>;
  contact_name?: Maybe<Scalars['String']>;
  contact_phone?: Maybe<Scalars['String']>;
  country?: Maybe<Scalars['String']>;
  createdAt?: Maybe<Scalars['String']>;
  discount_per_gallon?: Maybe<Scalars['String']>;
  fuel_price_per_gallon?: Maybe<Scalars['String']>;
  fuel_price_tax_rate?: Maybe<Scalars['String']>;
  fuel_price_type?: Maybe<Scalars['String']>;
  id: Scalars['ID'];
  invoice_type?: Maybe<Scalars['String']>;
  postal?: Maybe<Scalars['String']>;
  state?: Maybe<Scalars['String']>;
  updatedAt?: Maybe<Scalars['String']>;
}>;


export type AddCustomerMutation = { __typename?: 'Mutation', addCustomer: { __typename?: 'Customer', id: string, contact_email?: Maybe<string>, contact_name?: Maybe<string> } };

export type CustomerListQueryVariables = Exact<{
  limit?: Maybe<Scalars['Int']>;
  skip?: Maybe<Scalars['Int']>;
}>;


export type CustomerListQuery = { __typename?: 'Query', customers?: Maybe<Array<Maybe<{ __typename?: 'Customer', id: string, contact_name?: Maybe<string>, contact_email?: Maybe<string>, contact_phone?: Maybe<string>, company_name?: Maybe<string>, invoice_type?: Maybe<string>, country?: Maybe<string>, state?: Maybe<string>, city?: Maybe<string>, postal?: Maybe<string>, createdAt?: Maybe<string>, updatedAt?: Maybe<string> }>>> };


export const AddCustomerDocument = gql`
    mutation AddCustomer($adder_per_gallon: String, $address1: String, $address2: String, $city: String, $company_name: String, $contact_email: String, $contact_name: String, $contact_phone: String, $country: String, $createdAt: String, $discount_per_gallon: String, $fuel_price_per_gallon: String, $fuel_price_tax_rate: String, $fuel_price_type: String, $id: ID!, $invoice_type: String, $postal: String, $state: String, $updatedAt: String) {
  addCustomer(
    input: {adder_per_gallon: $adder_per_gallon, address1: $address1, address2: $address2, city: $city, company_name: $company_name, contact_email: $contact_email, contact_name: $contact_name, contact_phone: $contact_phone, country: $country, createdAt: $createdAt, discount_per_gallon: $discount_per_gallon, fuel_price_per_gallon: $fuel_price_per_gallon, fuel_price_tax_rate: $fuel_price_tax_rate, fuel_price_type: $fuel_price_type, id: $id, invoice_type: $invoice_type, postal: $postal, state: $state, updatedAt: $updatedAt}
  ) {
    id
    contact_email
    contact_name
  }
}
    `;
export type AddCustomerMutationFn = Apollo.MutationFunction<AddCustomerMutation, AddCustomerMutationVariables>;

/**
 * __useAddCustomerMutation__
 *
 * To run a mutation, you first call `useAddCustomerMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useAddCustomerMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [addCustomerMutation, { data, loading, error }] = useAddCustomerMutation({
 *   variables: {
 *      adder_per_gallon: // value for 'adder_per_gallon'
 *      address1: // value for 'address1'
 *      address2: // value for 'address2'
 *      city: // value for 'city'
 *      company_name: // value for 'company_name'
 *      contact_email: // value for 'contact_email'
 *      contact_name: // value for 'contact_name'
 *      contact_phone: // value for 'contact_phone'
 *      country: // value for 'country'
 *      createdAt: // value for 'createdAt'
 *      discount_per_gallon: // value for 'discount_per_gallon'
 *      fuel_price_per_gallon: // value for 'fuel_price_per_gallon'
 *      fuel_price_tax_rate: // value for 'fuel_price_tax_rate'
 *      fuel_price_type: // value for 'fuel_price_type'
 *      id: // value for 'id'
 *      invoice_type: // value for 'invoice_type'
 *      postal: // value for 'postal'
 *      state: // value for 'state'
 *      updatedAt: // value for 'updatedAt'
 *   },
 * });
 */
export function useAddCustomerMutation(baseOptions?: Apollo.MutationHookOptions<AddCustomerMutation, AddCustomerMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<AddCustomerMutation, AddCustomerMutationVariables>(AddCustomerDocument, options);
      }
export type AddCustomerMutationHookResult = ReturnType<typeof useAddCustomerMutation>;
export type AddCustomerMutationResult = Apollo.MutationResult<AddCustomerMutation>;
export type AddCustomerMutationOptions = Apollo.BaseMutationOptions<AddCustomerMutation, AddCustomerMutationVariables>;
export const CustomerListDocument = gql`
    query CustomerList($limit: Int, $skip: Int) {
  customers(limit: $limit, skip: $skip) {
    id
    contact_name
    contact_email
    contact_phone
    company_name
    invoice_type
    country
    state
    city
    postal
    createdAt
    updatedAt
  }
}
    `;

/**
 * __useCustomerListQuery__
 *
 * To run a query within a React component, call `useCustomerListQuery` and pass it any options that fit your needs.
 * When your component renders, `useCustomerListQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useCustomerListQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      skip: // value for 'skip'
 *   },
 * });
 */
export function useCustomerListQuery(baseOptions?: Apollo.QueryHookOptions<CustomerListQuery, CustomerListQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<CustomerListQuery, CustomerListQueryVariables>(CustomerListDocument, options);
      }
export function useCustomerListLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<CustomerListQuery, CustomerListQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<CustomerListQuery, CustomerListQueryVariables>(CustomerListDocument, options);
        }
export type CustomerListQueryHookResult = ReturnType<typeof useCustomerListQuery>;
export type CustomerListLazyQueryHookResult = ReturnType<typeof useCustomerListLazyQuery>;
export type CustomerListQueryResult = Apollo.QueryResult<CustomerListQuery, CustomerListQueryVariables>;