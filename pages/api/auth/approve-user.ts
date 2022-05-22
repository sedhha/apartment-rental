// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { approveRequest } from '@backend-utils/apis/approveUser'
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

export interface IApproveUserPayload {
  docId: string
  requestorUid: string
}
const handler = async (
  req: NextApiRequest,
  res: NextApiResponse<IResponse>
) => {
  const { payload } = req.body as {
    userBody: IUserDetails
    payload: IApproveUserPayload
  }
  const posts = await approveRequest({
    docId: payload.docId,
    requestorUid: payload.requestorUid,
  })
  if (posts.error) {
    const errorResponse = synthesizeErrorResponse({
      message: posts.message ?? 'Unexpected Error',
      status_code: 400,
    })
    return res.status(errorResponse.status_code).json(errorResponse)
  }
  const successResponse = synthesizeSuccessResponse({
    message: 'Approved User Successfully',
    status_code: 201,
    payload: posts,
  })
  return res.status(successResponse.status_code).json(successResponse)
}

export default withUserProtect(handler)
