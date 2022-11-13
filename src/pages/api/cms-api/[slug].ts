import type { NextApiRequest, NextApiResponse } from 'next';

import { cmsApi } from '~/services/cms-api/config';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  const { slug, ...queryWithoutSlug } = req.query;

  const { data } = await cmsApi({ proxy: false }).get(`/${slug}`, {
    params: { ...queryWithoutSlug },
  });

  return res.status(200).json(data);
}
