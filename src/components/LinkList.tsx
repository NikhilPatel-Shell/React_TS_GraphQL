import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';
import { CustomerObj, LINKS_PER_PAGE } from '../constants';
import { useHistory } from 'react-router';



export const CUSTOMER_QUERY = gql`
  query FeedQuery(
    $limit: Int
    $skip: Int
  ){
    customers(limit: $limit, skip: $skip)  {
      id
      contact_name
      contact_email
      company_name
      contact_phone
      createdAt
      country
    }
  }
`;

const NEW_LINKS_SUBSCRIPTION = gql`
  subscription {
    newLink {
      id
      url
      description
      createdAt
      postedBy {
        id
        name
      }
      votes {
        id
        user {
          id
        }
      }
    }
  }
`;

const NEW_VOTES_SUBSCRIPTION = gql`
  subscription {
    newVote {
      id
      link {
        id
        url
        description
        createdAt
        postedBy {
          id
          name
        }
        votes {
          id
          user {
            id
          }
        }
      }
      user {
        id
      }
    }
  }
`;


const getQueryVariables = (isNewPage: boolean, page: number): Object => {
  const skip = isNewPage ? (page - 1) * LINKS_PER_PAGE : 0;
  const limit = isNewPage ? LINKS_PER_PAGE : 100;
  return { limit, skip };
};

const LinkList = () => {
  const history = useHistory();
  
  const isNewPage = history.location.pathname.includes(
    'new'
  );

  const pageIndexParams = history.location.pathname.split(
    '/'
  );

  const page = parseInt(
    pageIndexParams[pageIndexParams.length - 1]
  );
        
  const {
    data,
    loading,
    error,
    subscribeToMore
  } = useQuery(CUSTOMER_QUERY, {
    variables: getQueryVariables(isNewPage, page)
  });

  const pageIndex = page ? (page - 1) * LINKS_PER_PAGE : 0;

  

  subscribeToMore({
    document: NEW_LINKS_SUBSCRIPTION,
    updateQuery: (prev, { subscriptionData }) => {
      if (!subscriptionData.data) return prev;
      const newLink = subscriptionData.data.newLink;
      const exists = prev.feed.links.find(
        ({ id }: any) => id === newLink.id
      );
      if (exists) return prev;
  
      return Object.assign({}, prev, {
        feed: {
          links: [newLink, ...prev.feed.links],
          count: prev.feed.links.length + 1,
          __typename: prev.feed.__typename
        }
      });
    }
  });

  subscribeToMore({
    document: NEW_VOTES_SUBSCRIPTION
  });
  

  return (
      <>
        {loading && <p>Loading...</p>}
        {error && <pre>{JSON.stringify(error, null, 2)}</pre>}
        {data?.customers && (
          <>
            {data?.customers.map(
              (cust: CustomerObj, index: number) => (
                <Link
                  key={cust.id.toString()}
                  link={cust}
                  index={index + pageIndex}
                />
              )
            )}
            {isNewPage && (
              <div className="flex ml4 mv3 gray">
                {
                  page > 1 && 
                  <div
                    className="pointer mr2"
                    onClick={() => {
                      history.push(`/new/${page - 1}`);  
                    }}
                  >
                    Previous
                  </div>
                }
                {
                  page < (25 / LINKS_PER_PAGE) &&
                  <div
                    className="pointer"
                    onClick={() => {
                  
                        const nextPage = page + 1;
                        history.push(`/new/${nextPage}`);
                      
                    }}
                  >
                    Next
                  </div>
                }
                
              </div>
            )}
          </>
        )}
      </>
  );
};

export default LinkList;