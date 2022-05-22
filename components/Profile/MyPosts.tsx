import { useAppSelector } from '@redux-imports/tools/hooks'
import Spinner from 'components/Spinner/Spinner'
import {
  ACTIONTYPES,
  getSelfPostApi,
  initState,
  reducer,
  aproveUserApi,
} from 'constants/immediate-states/post.state'
import React, { useEffect } from 'react'
import SelfPostsView from './Posts/SelfPosts'

export default function ViewPost() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { isLoggedIn, loggedInData } = useAppSelector((state) => state.user)
  const { error, success } = state
  const errorHandler = (errorMessage: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_ERROR_MESSAGE, payload: errorMessage })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
    dispatch({ type: ACTIONTYPES.UPDATE_SUCCESS_MESSAGE, payload: undefined })
  }

  const successHandler = (successMessage: string) => {
    dispatch({ type: ACTIONTYPES.UPDATE_ERROR_MESSAGE, payload: undefined })
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
    dispatch({
      type: ACTIONTYPES.UPDATE_SUCCESS_MESSAGE,
      payload: successMessage,
    })
  }
  const approveUserHandler = (docId: string, requestorUid: string) => {
    if (loggedInData?.authToken)
      aproveUserApi(loggedInData.authToken, {
        docId: docId,
        requestorUid: requestorUid,
      }).then((response) => {
        if (response.error) errorHandler(response.message)
        else successHandler(response.message)
      })
  }
  useEffect(() => {
    if (isLoggedIn) {
      if (loggedInData?.authToken) {
        dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: true })
        getSelfPostApi(loggedInData.authToken)
          .then((result) => {
            dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
            dispatch({
              type: ACTIONTYPES.UPDATE_SELF_POST_DATA,
              payload: result,
            })
          })
          .catch(errorHandler)
      }
    }
  }, [isLoggedIn])
  return state.loading ? (
    <Spinner />
  ) : (
    <React.Fragment>
      {error ? (
        <p className="mt-2 text-xs italic text-red-500">{error}</p>
      ) : null}
      {success ? (
        <p className="mt-2 text-xs italic text-lime-500">{success}</p>
      ) : null}
      <SelfPostsView
        posts={state.selfPosts}
        approveUserUid={approveUserHandler}
      />
    </React.Fragment>
  )
}
