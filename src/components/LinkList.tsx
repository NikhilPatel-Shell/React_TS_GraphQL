import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';
import { LinkObj } from '../constants';



export const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
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
  }
`;

const LinkList = () => {
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
    {data && (
      <>
        {data.feed.links.map((link: LinkObj, index: number) => (
          <Link key={link.id.toString()} link={link} index={index} />
        ))}
      </>
    )}
    </div>
  );
};

export default LinkList;