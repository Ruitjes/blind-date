// pages/api/removeSavedQuestionById/[questionId]
import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import http from "../../../utils/common_api";

export default async function removeSavedQuestionById(req: NextApiRequest, res: NextApiResponse) {
  try {
    const { accessToken } = await getAccessToken(req, res);
    const { questionId } = req.query

    await http.httptoken(accessToken).delete(`/question-service/Question/DeleteSavedQuestion/${questionId}`).then((api_res: any) => {
      res.status(200).json(api_res.data);
    }).catch((err) => {
      res.status(err?.response?.status).send(err.message);
    });

  } catch(error: any) {
    res.status(error.status || 500).send(error.message)
  }
};