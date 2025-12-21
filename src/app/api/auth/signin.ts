import { NextApiRequest, NextApiResponse } from 'next';

import { fetcher } from '../../../utils/axios';
import { endpoints } from '../../../utils/endpoints';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  try {
    const responseData = await fetcher({
      url: endpoints.auth.login,
    });

    res.status(200).json(responseData);
  } catch (error) {
    console.error('Error in API route:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
