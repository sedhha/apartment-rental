import React from 'react'
import Head from 'next/head'
import {
  ACTIONTYPES,
  initState,
  reducer,
} from 'constants/immediate-states/register.state'
import Link from 'next/link'
import { NAVIGATION_ROUTES } from 'constants/routes'

export default function LoginPage() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { error } = state
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <Head>
        <title>Apartment Rental: Register</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <h1 className="text-4xl font-bold font-std">
          Register with Apartment Rental
        </h1>
        <br />
        <div className="w-full max-w-xs">
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            <div className="mb-4">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Username
              </label>
              <input
                className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                type="email"
                placeholder="Email Address"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                className="w-full px-3 py-2 mb-1 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="mb-6">
              <label className="block mb-1 text-sm font-bold text-gray-700">
                Password
              </label>
              <input
                className="w-full px-3 py-2 mb-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                type="password"
                placeholder="******************"
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                type="button"
              >
                Register
              </button>
              {error ? (
                <p className="text-xs italic text-red-500">{error}</p>
              ) : null}
            </div>
          </form>
          <p>
            Already Registered? Go to{' '}
            <Link href={NAVIGATION_ROUTES.LOGIN}>
              <a className="text-indigo-600 underline">Login</a>
            </Link>{' '}
            Page
          </p>
        </div>
      </main>
    </div>
  )
}
