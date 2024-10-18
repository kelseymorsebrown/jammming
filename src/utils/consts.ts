export const CLIENT_ID = process.env.REACT_APP_CLIENT_ID;
export const REDIRECT_URI =
  process.env.NODE_ENV === 'production'
    ? 'https://kelseymorsebrown.github.io/jammming/callback'
    : 'http://localhost:3000/callback';
