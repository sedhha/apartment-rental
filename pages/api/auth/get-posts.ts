// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { getPosts } from '@backend-utils/apis/getPosts'
import {
  IUserDetails,
  withUserProtect,
} from '@backend-utils/middleware/withUserProtect'
import {
  IResponse,
  synthesizeSuccessResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import type { NextApiRequest, NextApiResponse } from 'next'
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const { userBody } = req.body as { userBody: IUserDetails }
  const posts = await getPosts(userBody.uid)
  const successResponse = synthesizeSuccessResponse({
    message: 'Post Fetched Successfully',
    status_code: 201,
    payload: posts,
  })
  return res.status(successResponse.status_code).json(successResponse)
}

export default withUserProtect(handler)
