/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/pages/home',
        },
        {
          source: '/admin-login',
          destination: '/pages/admin-login',
        },
        {
          source: '/events-navigator',
          destination: '/pages/events-navigator',
        },
        {
          source: '/report-problem',
          destination: '/pages/report-problem',
        }
      ];
    },
  };
  
  export default nextConfig;
  