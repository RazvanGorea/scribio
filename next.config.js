/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  async redirects() {
    return [
      // If refresh_token cookie is found (User is logged in) then redirect to main page
      {
        source: "/logIn",
        has: [
          {
            type: "cookie",
            key: "refresh_token",
          },
        ],
        permanent: false,
        destination: "/",
      },
      {
        source: "/signUp",
        has: [
          {
            type: "cookie",
            key: "refresh_token",
          },
        ],
        permanent: false,
        destination: "/",
      },
    ];
  },
};
