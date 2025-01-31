/** @type {import('next').NextConfig} */
const nextConfig = {
    async rewrites() {
      return [
        {
          source: '/',
          destination: '/pages/home',
        },
        {
          source: '/newevent',
          destination: '/pages/newEvent',
        },
        {
          source: '/reportproblem',
          destination: '/pages/reportProblem',
        },
        {
          source: '/home-old',
          destination: '/pages/home-old',
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
  