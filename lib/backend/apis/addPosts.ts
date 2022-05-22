import { IDatabasePostState } from 'constants/immediate-states/post.state'
import Firebase, { firebasePaths } from '@backend-utils/firebase-server'
import { IOpsResponse } from '@backend-utils/responsehandlers/synthesizer'
import { FirebaseError } from 'firebase-admin'
export const addPosts = async (
  postData: IDatabasePostState
): Promise<IOpsResponse> => {
  const validationResults = validationChecks(postData)
  if (validationResults.error) return validationResults
  const docId = Firebase.db.collection(firebasePaths.posts).doc().id
  postData.docId = docId
  return Firebase.db
    .collection(firebasePaths.posts)
    .doc(docId)
    .set(postData, { merge: true })
    .then(() => ({ error: false }))
    .catch((error: FirebaseError) => ({ error: true, message: error.message }))
}

const validationChecks = (
  postData: IDatabasePostState
): { error: boolean; message: string } => {
  if (postData?.size?.length < 5)
    return {
      error: true,
      message: 'Size Description must be atleast 5 characters long',
    }
  if (postData?.rooms?.length < 5)
    return {
      error: true,
      message: 'Room Description must be atleast 5 characters long',
    }
  if (postData?.address?.length < 5)
    return { error: true, message: 'Address must be atleast 5 characters long' }
  if (postData?.monthlyRent < 0)
    return { error: true, message: 'Monthly Rent must be greater than 0' }
  if (postData?.securitDeposit < 0)
    return { error: true, message: 'Security Deposit must be greater than 0' }

  return { error: false, message: 'No Errors' }
}
