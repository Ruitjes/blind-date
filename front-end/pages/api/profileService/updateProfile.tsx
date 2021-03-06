import { NextApiRequest, NextApiResponse } from 'next';
import { getAccessToken } from '@auth0/nextjs-auth0';
import http from '../../../utils/common_api';

export default async function updateProfile(
	req: NextApiRequest,
	res: NextApiResponse
) {
	try {
		const { accessToken } = await getAccessToken(req, res);

		await http
			.httptoken(accessToken)
			.put('profile-service/Profile/UpdateProfile', req.body)
			.then((api_res: any) => {
				res.status(200).json(api_res.data);
			})
			.catch((err) => {
				console.log(err);
				res.status(err?.response?.status).send(err.message);
			});
	} catch (error: any) {
		console.error(error);
		res.status(error.status || 500).send(error.message);
	}
}