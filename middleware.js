export { default } from 'next-auth/middleware';

// To have specific pages to be protected
export const config = {
  matcher: ['/properties/add', '/profile', '/properties/saved', '/messages'],
};
