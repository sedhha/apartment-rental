import Firebase, { firebasePaths } from '@backend-utils/firebase-server'
import { IOpsResponse } from '@backend-utils/responsehandlers/synthesizer'
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
