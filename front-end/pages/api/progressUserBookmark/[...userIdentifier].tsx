// pages/api/progressUserBookmark/[userIdentifier].js
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import http from "../../../utils/common_api";

export default async function progressuserbookmark(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const { userIdentifier } = req.query
    
    await http.httptoken(accessToken).get(`/question-service/Feed/ProgressUserBookmark/${userIdentifier}`).then((api_res: any) => {
        res.status(200).json(api_res.data);
      }).catch(({err}) => {
        res.status(400).end({ err });
      });

  } catch(error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
};