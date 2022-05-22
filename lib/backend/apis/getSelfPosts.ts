import Firebase, { firebasePaths } from '@backend-utils/firebase-server'
import { IDatabasePostState } from 'constants/immediate-states/post.state'
export const getSelfPosts = async (
  uid: string
): Promise<IDatabasePostState[]> => {
  // We could implement Lazy Loading but for the time constraint keeping the fetch
  // all at once. For lazy loading it would be limit().offset()
  return Firebase.db
    .collection(firebasePaths.posts)
    .where('uid', '==', uid)
    .get()
    .then((posts) => {
      const result = posts.docs.map((post) => post.data() as IDatabasePostState)
      return result
    })
    .catch((error) => {
      console.log('Firebase Error Occured while fetching data - ', error)
      return [] as IDatabasePostState[]
    })
}
