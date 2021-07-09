export const AUTH_TOKEN = 'auth-token';

export const LINKS_PER_PAGE = 5;

export interface LinkObj {
  id: number,
  createdAt: string,
  url:string,
  description: string,
  postedBy: {
    name: string;
  },
  votes: Array<string>,
}