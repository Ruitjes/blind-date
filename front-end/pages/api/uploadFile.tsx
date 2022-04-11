// pages/api/uploadFile/[userIdentifier].js
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import http from "../../utils/common_api";

export default async function uploadFile(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    
    await http.httptoken(accessToken).post(`/upload-service/api/Upload`, req.body).then((api_res: any) => {
        res.status(200).json(api_res.data);
      }).catch((err) => {
        console.error(err)
        res.status(err?.status || 404).end(err.message);
      });

  } catch(error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
};