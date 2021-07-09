import React from 'react';
import Link from './Link';
import { useQuery, gql } from '@apollo/client';

const FEED_QUERY = gql`
  {
    feed {
      id
      links {
        id
        createdAt
        url
        description
      }
    }
  }
`;

interface LinkObj {
  id: Number,
  createdAt: String,
  url:String,
  description: String,
}

const LinkList = () => {
  // const linksToRender = [
  //   {
  //     id: '1',
  //     description:
  //       'Prisma gives you a powerful database toolkit 😎',
  //     url: 'https://prisma.io'
  //   },
  //   {
  //     id: '2',
  //     description: 'The best GraphQL client',
  //     url: 'https://www.apollographql.com/docs/react/'
  //   }
  // ];
  const { data } = useQuery(FEED_QUERY);
  return (
    <div>
      {data && (
        <>
          {data.feed.links.map((link: LinkObj) => (
            <Link key={link.id.toString()} link={link} />
          ))}
        </>
      )}
    </div>
  );
};

export default LinkList;