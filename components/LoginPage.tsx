import React from 'react'
import Head from 'next/head'
import {
  ACTIONTYPES,
  initState,
  reducer,
} from 'constants/immediate-states/login.state'

export default function LoginPage() {
  const [state, dispatch] = React.useReducer(reducer, initState)
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
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Email Address
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                type="text"
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
              >
                Sign In
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  )
}
