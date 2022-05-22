import React from 'react'
import Head from 'next/head'
import {
  ACTIONTYPES,
  initState,
  reducer,
} from 'constants/immediate-states/login.state'
import Link from 'next/link'
import { signInWithEmailAndPassword } from 'firebase/auth'
import Auth from '@frontent-utils/firebase-client'
import { NAVIGATION_ROUTES } from 'constants/routes'
import Spinner from './Spinner/Spinner'
import { FirebaseError } from 'firebase/app'
import { useRouter } from 'next/router'
import { useAppDispatch } from '@redux-imports/tools/hooks'
import { updateLoggedInWithData } from '@redux-imports/slices/posts'

export default function LoginPage() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const router = useRouter()
  const reduxDispatch = useAppDispatch()
  const { error, email, password, loading } = state
  const updateError = (errorMessage: string): void => {
    dispatch({
      type: ACTIONTYPES.UPDATE_ERROR_MESSAGE,
      payload: errorMessage,
    })

    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
  }
  const loginSuccess = () => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: false })
    dispatch({ type: ACTIONTYPES.UPDATE_ERROR_MESSAGE, payload: undefined })
    router.push(NAVIGATION_ROUTES.PROFILE_VIEW_POST)
  }
  const loginUser = () => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: true })
    signInWithEmailAndPassword(Auth, email, password)
      .then((data) =>
        data.user
          .getIdToken()
          .then((result) => {
            reduxDispatch(
              updateLoggedInWithData({
                isLoggedIn: true,
                loggedInData: {
                  email: data.user.email ?? 'guest-email',
                  uid: data.user.uid,
                  authToken: result,
                },
              })
            )
            loginSuccess()
          })
          .catch((error: FirebaseError) =>
            updateError(error.message.replace('Firebase: ', ''))
          )
      )
      .catch((error: FirebaseError) =>
        updateError(error.message.replace('Firebase: ', ''))
      )
  }
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Apartment Rental: Login</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-4xl font-bold font-std">
          Login to Apartment Rental
        </h1>
        <br />
        <div className="w-full max-w-xs">
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            {loading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Email Address
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="email"
                    placeholder="Email"
                    value={state.email}
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_EMAIL,
                        payload: e.target.value,
                      })
                    }}
                  />
                </div>
                <div className="mb-6">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Password
                  </label>
                  <input
                    className="w-full px-3 py-2 mb-3 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="password"
                    placeholder="******************"
                    value={state.password}
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_PASSWORD,
                        payload: e.target.value,
                      })
                    }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                    type="button"
                    onClick={loginUser}
                  >
                    Sign In
                  </button>
                </div>
                {error ? (
                  <p className="mt-2 text-xs italic text-red-500">{error}</p>
                ) : null}
              </React.Fragment>
            )}
          </form>
          <p>
            Not Registered? Go to{' '}
            <Link href={NAVIGATION_ROUTES.REGISTER}>
              <a className="text-indigo-600 underline">Register</a>
            </Link>{' '}
            Page
          </p>
        </div>
      </main>
    </div>
  )
}
