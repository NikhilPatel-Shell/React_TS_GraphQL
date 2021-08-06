import React, { ChangeEvent, useState } from 'react';
import { useHistory } from 'react-router';
import { Form, FormGroup, Label, Input, FormFeedback, FormText, Row, Col, Button } from 'reactstrap';
import { regex } from '../../constants';
import { useAddCustomerMutation } from '../../generated/graphql';

const CreateCustomer = () => {
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

  const [createCustomer] = useAddCustomerMutation({
    variables: {
      ...formState
    },
    update: (cache, { data }) => {
      console.log("🚀 ~ file: CreateCustomer.tsx ~ line 42 ~ CreateCustomer ~ customers", data)

      // const data: any = cache.readQuery({
      //   query: CUSTOMER_QUERY,
      //   variables: {
      //     limit: LINKS_PER_PAGE,
      //     skip: 0,
      //   },
      // });

      // cache.writeQuery({
      //   query: CUSTOMER_QUERY,
      //   data: {
      //     feed: {
      //       links: [post, ...data.feed.links]
      //     }
      //   },
      //   variables: {
      //     limit: LINKS_PER_PAGE,
      //     skip: 0,
      //   },
      // });
    },
    onCompleted: () => history.push('/customers')
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState({ ...formState, [name]: value.toString() });
  }

  return (
    <>
      <div className="d-flex justify-content-center flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Create New Customer</h1>
      </div>
      <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom">
        <h1 className="h2">Customer Details</h1>
      </div>
      <Form onSubmit={(e) => {
        e.preventDefault();
        createCustomer();
      }}>
        <Row>
          <Col md={4}>
            <div className="mb-4">
              <Label for="id">Id</Label>
              <Input
                id="id"
                name="id"
                value={formState.id}
                onChange={handleChange}
                type="text"
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-4">
              <Label for="company_name">Company name</Label>
              <Input
                type="text"
                id="company_name"
                name="company_name"
                value={formState.company_name}
                onChange={handleChange}
              />
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-4">
              <Label for="contact_name">Contact name</Label>
              <Input
                id="contact_name"
                name="contact_name"
                value={formState.contact_name}
                onChange={handleChange}
                type="text"
              />
              <FormFeedback >Invalid contact name.</FormFeedback>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={6}>
            <div className="mb-4">
              <Label for="contact_email">Contact email</Label>
              <Input
                type="email"
                id="contact_email"
                name="contact_email"
                value={formState.contact_email}
                onChange={handleChange}
                invalid={formState.contact_email ? !regex.email.test(formState.contact_email) : undefined}
                valid={formState.contact_email ? regex.email.test(formState.contact_email) : undefined}
              />
              <FormFeedback >Invalid contact email.</FormFeedback>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-4">
              <Label for="contact_phone">Contact phone</Label>
              <Input
                id="contact_phone"
                name="contact_phone"
                value={formState.contact_phone}
                onChange={handleChange}
                type="text"
                maxLength={10}
              />
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={3}>
            <div className="mb-4">
              <Label for="country">Country</Label>
              <Input
                name="country"
                id="country"
                value={formState.country}
                onChange={handleChange}
                type="text"
              />
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-4">
              <Label for="city">City</Label>
              <Input
                name="city"
                id="city"
                value={formState.city}
                onChange={handleChange}
                type="text"
              />
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-4">
              <Label for="state">State</Label>
              <Input
                name="state"
                id="state"
                value={formState.state}
                onChange={handleChange}
                type="text"
              />
            </div>
          </Col>
          <Col md={3}>
            <div className="mb-4">
              <Label for="postal">Postal</Label>
              <Input
                name="postal"
                id="postal"
                value={formState.postal}
                onChange={handleChange}
                type="text"
              />
            </div>
          </Col>
        </Row>

        <Row>
          <div className="mb-4">
            <Label for="address1">Address 1</Label>
            <Input
              id="address1"
              name="address1"
              value={formState.address1}
              onChange={handleChange}
              type="text"
              placeholder="1234 Main St"
            />
          </div>
          <div className="mb-4">
            <Label for="address2">Address 2</Label>
            <Input
              id="address2"
              name="address2"
              value={formState.address2}
              onChange={handleChange}
              type="text"
              placeholder="Apartment, studio, or floor"
            />
          </div>
        </Row>

        <Row>
          <Col md={6}>
            <div className="mb-4">
              <Label for="fuel_price_type">Fuel price type</Label>
              <Input
                type="select"
                placeholder="Fuel price per gallon"
                name="fuel_price_type"
                id="fuel_price_type"
                value={formState.fuel_price_type}
                onChange={handleChange}
              >
                <option value="Regular">Regular</option>
                <option value="Special">Special</option>
                <option value="V-Power">V-Power</option>
                <option value="Diesel">Diesel</option>
              </Input>
            </div>
          </Col>
          <Col md={6}>
            <div className="mb-4">
              <Label for="fuel_price_per_gallon">Fuel price per gallon</Label>
              <Input
                type="number"
                placeholder="Fuel price per gallon"
                name="fuel_price_per_gallon"
                id="fuel_price_per_gallon"
                value={formState.fuel_price_per_gallon}
                onChange={handleChange}
                step="any"
                invalid={Number(formState.fuel_price_per_gallon) < 0}
                valid={formState.fuel_price_per_gallon ? Number(formState.fuel_price_per_gallon) >= 0 : undefined}
                min={0}
              />
              <FormFeedback>Fuel price per gallon should be <span>&#8805;</span> 0.</FormFeedback>
            </div>
          </Col>
        </Row>

        <Row>
          <Col md={4}>
            <div className="mb-4">
              <Label for="fuel_price_tax_rate">Fuel price tax rate</Label>
              <Input
                type="number"
                placeholder="Fuel price tax rate"
                name="fuel_price_tax_rate"
                id="fuel_price_tax_rate"
                value={formState.fuel_price_tax_rate}
                onChange={handleChange}
                step="any"
                invalid={Number(formState.fuel_price_tax_rate) < 0}
                valid={formState.fuel_price_tax_rate ? Number(formState.fuel_price_tax_rate) >= 0 : undefined}
                min={0}
              />
              <FormFeedback>Fuel price tax rate should be <span>&#8805;</span> 0.</FormFeedback>
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-4">
              <Label for="adder_per_gallon">Adder per gallon</Label>
              <Input
                type="number"
                placeholder="Adder per gallon"
                name="adder_per_gallon"
                id="adder_per_gallon"
                value={formState.adder_per_gallon}
                onChange={handleChange}
                step="any"
                invalid={Number(formState.adder_per_gallon) < 0}
                valid={formState.adder_per_gallon ? Number(formState.adder_per_gallon) >= 0 : undefined}
                min={0}
              />
              <FormFeedback>Adder per gallon should be <span>&#8805;</span> 0.</FormFeedback>
            </div>
          </Col>
          <Col md={4}>
            <div className="mb-4">
              <Label for="discount_per_gallon">Discount per gallon</Label>
              <Input
                type="number"
                placeholder="Discount per gallon"
                name="discount_per_gallon"
                id="discount_per_gallon"
                value={formState.discount_per_gallon}
                onChange={handleChange}
                step="any"
                invalid={Number(formState.discount_per_gallon) < 0}
                valid={formState.discount_per_gallon ? Number(formState.discount_per_gallon) >= 0 : undefined}
                min={0}
              />
              <FormFeedback>Discount per gallon should be <span>&#8805;</span> 0.</FormFeedback>
            </div>
          </Col>
        </Row>

        <Row className="mb-3">
          <div className="mb-4">
            <Label for="invoice_type">Invoice type</Label>
            <Input
              type="select"
              placeholder="Invoice type"
              name="invoice_type"
              id="invoice_type"
              value={formState.invoice_type}
              onChange={handleChange}
            >
              <option value="Voyager">Voyager</option>
              <option value="Internal">Internal</option>
              <option value="Wax">Wax</option>
            </Input>
          </div>
        </Row>

        <Button type="submit">Create</Button>
      </Form>
    </>
  );
};

export default CreateCustomer;