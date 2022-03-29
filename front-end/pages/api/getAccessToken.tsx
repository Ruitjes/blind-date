import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
 
export default async function getaccesstoken(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    res.json(accessToken);
  } catch (error: any) {
    console.error(error);
    res.status(error.status || 500).end(error.message);
  }
}