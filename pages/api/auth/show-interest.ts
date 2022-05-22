// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { showInterest } from '@backend-utils/apis/addInterests'
import {
  IUserDetails,
  withUserProtect,
} from '@backend-utils/middleware/withUserProtect'
import {
  IResponse,
  synthesizeErrorResponse,
  synthesizeSuccessResponse,
} from '@backend-utils/responsehandlers/synthesizer'
import type { NextApiRequest, NextApiResponse } from 'next'

export interface IShowInterestPayload {
  docId: string
}
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const { userBody, payload } = req.body as {
    userBody: IUserDetails
    payload: IShowInterestPayload
  }
  const posts = await showInterest({
    docId: payload.docId,
    applierUid: userBody.uid,
    applierEmail: userBody.email,
  })
  if (posts.error) {
    const errorResponse = synthesizeErrorResponse({
      message: posts.message ?? 'Unexpected Error',
      status_code: 400,
    })
    return res.status(errorResponse.status_code).json(errorResponse)
  }
  const successResponse = synthesizeSuccessResponse({
    message: 'Interest Added Successfully',
    status_code: 201,
    payload: posts,
  })
  return res.status(successResponse.status_code).json(successResponse)
}

export default withUserProtect(handler)
