import { NextApiHandler, NextApiRequest, NextApiResponse } from 'next'
import Server from '@backend-utils/firebase-server'
import { synthesizeErrorResponse } from '@backend-utils/responsehandlers/synthesizer'
import { FirebaseError } from 'firebase-admin'

export interface IUserDetails {
  authToken: string
  uid: string
  email: string
}

/*
        Intercepting and Authenticating all Authentication Requests
*/

export const withUserProtect = (handler: NextApiHandler) => {
  return async (request: NextApiRequest, response: NextApiResponse) => {
    const firebaseToken = request.headers.authorization ?? ''
    try {
      const decodedToken = await Server.auth.verifyIdToken(firebaseToken)
      const uid = decodedToken.uid
      const userBody: IUserDetails = {
        authToken: firebaseToken,
        email: decodedToken.email ?? 'Guest User',
        uid,
      }
      request.body.userBody = userBody
      return handler(request, response)
    } catch (e) {
      console.log('Auth Error = ', e)
      const result = synthesizeErrorResponse({
        message: (e as FirebaseError).message,
        status_code: 401,
      })
      return response.status(result.status_code).json(result)
    }
  }
}
