import Firebase, { firebasePaths } from '@backend-utils/firebase-server'
import { IOpsResponse } from '@backend-utils/responsehandlers/synthesizer'
import { IDatabasePostState } from 'constants/immediate-states/post.state'
import { FirebaseError } from 'firebase-admin'

export interface IAddInterest {
  docId: string
  requestorUid: string
}
export const approveRequest = async (
  props: IAddInterest
): Promise<IOpsResponse> => {
  const doc = await Firebase.db
    .collection(firebasePaths.posts)
    .doc(props.docId)
    .get()
  if (!doc.exists)
    return { error: true, message: 'Invalid Application Request' }
  const data = doc.data() as IDatabasePostState
  if (data.approvedUser === props.requestorUid)
    return { error: true, message: 'You have already approved this User.' }

  return Firebase.db
    .collection(firebasePaths.posts)
    .doc(props.docId)
    .set(
      { isAvailable: false, approvedUser: props.requestorUid },
      { merge: true }
    )
    .then(() => ({ error: false }))
    .catch((error: FirebaseError) => ({ error: true, message: error.message }))
}
