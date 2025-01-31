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
          source: '/new-event',
          destination: '/pages/newEvent',
        },
        {
          source: '/report-problem',
          destination: '/pages/reportProblem',
        }
      ];
    },
  };
  
  export default nextConfig;
  