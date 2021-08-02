import React, { ChangeEvent, useState } from 'react';
import { useMutation, gql } from '@apollo/client';
import { useHistory } from 'react-router';
import { CUSTOMER_QUERY } from './LinkList';
import { LINKS_PER_PAGE, CustomerObj } from '../constants';

const CREATE_LINK_MUTATION = gql`
  mutation PostMutation(
    $payload: CustomerObj
  ) {
    post(payload: $payload) {
      id
      createdAt
      url
      description
    }
  }
`;

const CreateLink = () => {
  const [formState, setFormState] = useState({
    adder_per_gallon: '',
    address1: '',
    address2: '',
    city: '',
    company_name: '',
    contact_email: '',
    contact_name: '',
    contact_phone: '',
    country: '',
    createdAt: '',
    discount_per_gallon: '',
    fuel_price_per_gallon: '',
    fuel_price_tax_rate: '',
    fuel_price_type: '',
    id: '',
    invoice_type: '',
    postal: '',
    state: '',
    updatedAt: '',
  });

  const history = useHistory();

  const [createCustomer] = useMutation(CREATE_LINK_MUTATION, {
    variables: {
      ...formState
    },
    update: (cache, { data: { post } }) => {
      const take = LINKS_PER_PAGE;
      const skip = 0;
      const orderBy = { createdAt: 'desc' };

      const data: any = cache.readQuery({
        query: CUSTOMER_QUERY,
        variables: {
          take,
          skip,
          orderBy
        }
      });

      cache.writeQuery({
        query: CUSTOMER_QUERY,
        data: {
          feed: {
            links: [post, ...data.feed.links]
          }
        },
        variables: {
          take,
          skip,
          orderBy
        }
      });
    },
    onCompleted: () => history.push('/new/1')
  });

  const handleChange = ( e: ChangeEvent<HTMLInputElement> ) => {
    const { name ,value }  = e.target;
    setFormState({ ...formState, [name]: value });
  }

  return (
    <div>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          createCustomer();
        }}
      >
        <div className="flex flex-column mt3">
          <input
            className="mb2"
            name="adder_per_gallon"
            value={formState.adder_per_gallon}
            onChange={handleChange}
            type="text"
            placeholder="adder_per_gallon"
          />
          <input
            className="mb2"
            name="address1"
            value={formState.address1}
            onChange={handleChange}
            type="text"
            placeholder="address1"
          />
          <input
            className="mb2"
            name="address2"
            value={formState.address2}
            onChange={handleChange}
            type="text"
            placeholder="address2"
          />
          <input
            className="mb2"
            name="city"
            value={formState.city}
            onChange={handleChange}
            type="text"
            placeholder="city"
          />
          <input
            className="mb2"
            name="company_name"
            value={formState.company_name}
            onChange={handleChange}
            type="text"
            placeholder="company_name"
          />
          <input
            className="mb2"
            name="contact_email"
            value={formState.contact_email}
            onChange={handleChange}
            type="text"
            placeholder="contact_email"
          />
          <input
            className="mb2"
            name="contact_name"
            value={formState.contact_name}
            onChange={handleChange}
            type="text"
            placeholder="contact_name"
          />
          <input
            className="mb2"
            name="contact_phone"
            value={formState.contact_phone}
            onChange={handleChange}
            type="text"
            placeholder="contact_phone"
          />
          <input
            className="mb2"
            name="country"
            value={formState.country}
            onChange={handleChange}
            type="text"
            placeholder="country"
          />
          <input
            className="mb2"
            name="createdAt"
            value={formState.createdAt}
            onChange={handleChange}
            type="text"
            placeholder="createdAt"
          />
          <input
            className="mb2"
            name="discount_per_gallon"
            value={formState.discount_per_gallon}
            onChange={handleChange}
            type="text"
            placeholder="discount_per_gallon"
          />
          <input
            className="mb2"
            name="fuel_price_per_gallon"
            value={formState.fuel_price_per_gallon}
            onChange={handleChange}
            type="text"
            placeholder="fuel_price_per_gallon"
          />
          <input
            className="mb2"
            name="fuel_price_tax_rate"
            value={formState.fuel_price_tax_rate}
            onChange={handleChange}
            type="text"
            placeholder="fuel_price_tax_rate"
          />
          <input
            className="mb2"
            name="fuel_price_type"
            value={formState.fuel_price_type}
            onChange={handleChange}
            type="text"
            placeholder="fuel_price_type"
          />
          <input
            className="mb2"
            name="id"
            value={formState.id}
            onChange={handleChange}
            type="text"
            placeholder="id"
          />
          <input
            className="mb2"
            name="invoice_type"
            value={formState.invoice_type}
            onChange={handleChange}
            type="text"
            placeholder="invoice_type"
          />
          <input
            className="mb2"
            name="postal"
            value={formState.postal}
            onChange={handleChange}
            type="text"
            placeholder="postal"
          />
          <input
            className="mb2"
            name="state"
            value={formState.state}
            onChange={handleChange}
            type="text"
            placeholder="state"
          />
          <input
            className="mb2"
            name="updatedAt"
            value={formState.updatedAt}
            onChange={handleChange}
            type="text"
            placeholder="updatedAt"
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default CreateLink;