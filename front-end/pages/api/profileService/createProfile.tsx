import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import http from '../../../utils/common_api';

export default async function createProfile(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { accessToken } = await getAccessToken(req, res);
		console.log(req.body);
		
		await http
			.httptoken(accessToken)
			.post('profile-service/Profile/CreateProfile', req.body)
			.then((api_res: any) => {
				res.status(200).json(api_res.data);
			})
			.catch((err) => {
				res.status(err?.status || 404).end(err.message);
			});
	} catch (error: any) {
		res.status(error.status || 500).end(error.message);
	}
}
