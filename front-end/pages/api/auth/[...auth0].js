// pages/api/auth/[...auth0].js
import { handleAuth, handleLogin, handleProfile } from '@auth0/nextjs-auth0';

const afterRefetch = async (req, res, session) => {
  console.log('in afterRefetch')
  console.log(session)
};

export default handleAuth({
  async login(req, res) {
    try {
      await handleLogin(req, res, {
        authorizationParams: {
          audience: 'seethrough', // or AUTH0_AUDIENCE
          // Add the `offline_access` scope to also get a Refresh Token
          scope: 'openid profile email', // or AUTH0_SCOPE
        }
      });
    } catch (error) {
      res.status(error.status || 400).end(error.message);
    }
  },
  async profile(req, res) {
    try {
      await handleProfile(req, res, {refetch: true })
    } catch (error) {
      res.status(error.status || 500).end(error.message)
    }
  }
});