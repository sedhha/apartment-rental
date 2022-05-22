import React, { useEffect } from 'react'
import Profile from 'components/Profile/Profile'
import { onAuthStateChanged } from 'firebase/auth'
import Auth from '@frontent-utils/firebase-client'
import { useAppDispatch } from '@redux-imports/tools/hooks'
import { updateLoggedInWithData } from '@redux-imports/slices/posts'
type Props = {}

export default function PostOpType({}: Props) {
  const dispatch = useAppDispatch()
  useEffect(() => {
    onAuthStateChanged(Auth, (user) => {
      if (user) {
        user.getIdToken().then((token) => {
          dispatch(
            updateLoggedInWithData({
              isLoggedIn: true,
              loggedInData: {
                email: user.email ?? 'guest-email',
                uid: user.uid,
                authToken: token,
              },
            })
          )
        })
      }
    })
  })
  return <Profile />
}
