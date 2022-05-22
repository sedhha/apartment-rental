import Firebase, { firebasePaths } from '@backend-utils/firebase-server'
import { IOpsResponse } from '@backend-utils/responsehandlers/synthesizer'
import { IDatabasePostState } from 'constants/immediate-states/post.state'
import { FirebaseError } from 'firebase-admin'

export interface IAddInterest {
  docId: string
  applierUid: string
  applierEmail: string
}
export const showInterest = async (
  props: IAddInterest
): Promise<IOpsResponse> => {
  const doc = await Firebase.db
    .collection(firebasePaths.posts)
    .doc(props.docId)
    .get()
  if (!doc.exists)
    return { error: true, message: 'Invalid Application Request' }
  const resultData = doc.data() as IDatabasePostState
  const assignedUser = resultData?.approvedUser
  if (assignedUser === props.applierUid)
    return { error: true, message: 'Owner has already approved your Request.' }
  const interestedUsers = resultData?.interestedUsers || []
  const alreadyAdded = interestedUsers.some(
    (doc: { uid: string; email: string }) => doc.uid === props.applierUid
  )
  if (alreadyAdded) return { error: true, message: 'Already Shown interest' }
  interestedUsers.push({ uid: props.applierUid, email: props.applierEmail })

  return Firebase.db
    .collection(firebasePaths.posts)
    .doc(props.docId)
    .set({ interestedUsers }, { merge: true })
    .then(() => ({ error: false }))
    .catch((error: FirebaseError) => ({ error: true, message: error.message }))
}
