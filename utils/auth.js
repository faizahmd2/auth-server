import jwt from 'jsonwebtoken';
import config from '../config/config.js'

export const authenticate = async (context) => {
  const { req } = context;
  const token = req.cookies.token;
  let isAuthenticated = false;
  let user;
  console.log("AUth Called", token)

  if (token) {
    try {
      const options = {
          expiresIn: config.get('JWT_EXPIRY'),
      };

      let result = jwt.verify(token, config.get('JWT_SECRET'), options);

      user = result;
      console.log("USER:",user)
      isAuthenticated = true;

    } catch (error) {
      console.log("catche error authenticate validation:", error);
      isAuthenticated = false;
    }
  }


  if (!isAuthenticated) {
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };
  }

  return {
    props: { user },
  };
};
