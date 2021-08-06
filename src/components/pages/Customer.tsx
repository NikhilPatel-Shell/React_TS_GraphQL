import React from 'react';
import { CustomerObj } from '../../constants';


const Customer = (props: { link: CustomerObj, index: number }) => {
  const { link, index } = props;

  return (
    <div className="flex mt2 items-start">
      <div className="flex items-center">
        <span className="gray">{index + 1}.</span>
      </div>
      <div className="ml1">
        <div>
          {link.company_name}
        </div>
        <div>
          {link.contact_name}
        </div>
        <div>
          {link.contact_phone}
        </div>
        <div className="f6 lh-copy gray">
          {new Date(Number(link.createdAt)).toDateString()}
        </div>
      </div>
    </div>
  );
};


export default Customer;