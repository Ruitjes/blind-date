// pages/api/getQuestionBatchForUser/[userIdentifier]
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import http from "../../../utils/common_api";

export default async function getquestionbatchforuser(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const { userIdentifier } = req.query

    await http.httptoken(accessToken).get(`/question-service/Feed/GetQuestionBatchForUser/${userIdentifier}`).then((api_res: any) => {
      res.status(200).json(api_res.data);
    }).catch((err) => {
      res.status(err?.status || 404).end(err.message);
    });

  } catch(error: any) {
    console.error(error)
    res.status(error.status || 500).end(error.message)
  }
};