// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { addPosts } from '@backend-utils/apis/addPosts'
import {
  IUserDetails,
  withUserProtect,
} from '@backend-utils/middleware/withUserProtect'
import {
  IResponse,
  synthesizeErrorResponse,
  synthesizeSuccessResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import {
  IDatabasePostState,
  IPostState,
} from 'constants/immediate-states/post.state'
import type { NextApiRequest, NextApiResponse } from 'next'

type IncomingRequest = {
  userBody: IUserDetails
  payload: IPostState
}

const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const body = req.body as IncomingRequest
  const payload: IDatabasePostState = {
    ...body.payload,
    uid: body.userBody.uid,
  }
  const { error, message } = await addPosts(payload)
  if (error && message) {
    const errorResponse = synthesizeErrorResponse({ message, status_code: 400 })
    return res.status(errorResponse.status_code).json(errorResponse)
  }
  const successResponse = synthesizeSuccessResponse({
    message: 'Post Added Successfully',
    status_code: 201,
  })
  return res.status(successResponse.status_code).json(successResponse)
}

export default withUserProtect(handler)
