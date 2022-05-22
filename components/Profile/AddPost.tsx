import { useAppSelector } from '@redux-imports/tools/hooks'
import Spinner from 'components/Spinner/Spinner'
import {
  initState,
  reducer,
  ACTIONTYPES,
  addPostApi,
} from 'constants/immediate-states/post.state'
import React from 'react'

export default function AddPost() {
  const [state, dispatch] = React.useReducer(reducer, initState)
  const { loggedInData } = useAppSelector((state) => state.user)
  const { loading, error, success } = state

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
  const addPost = () => {
    dispatch({ type: ACTIONTYPES.UPDATE_LOADING, payload: true })
    addPostApi(loggedInData?.authToken ?? '', state).then((data) => {
      if (data.error) errorHandler(data.message)
      else successHandler(data.message)
    })
  }
  return (
    <React.Fragment>
      <main className="flex flex-col items-center justify-center flex-1 w-full px-20 text-center">
        <div className="w-full max-w-xs">
          <form className="px-8 pt-6 pb-8 mb-4 bg-white rounded shadow-md">
            {loading ? (
              <Spinner />
            ) : (
              <React.Fragment>
                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Appartent Size
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="text"
                    placeholder="Appartent Size"
                    value={state.size}
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_SIZE,
                        payload: e.target.value,
                      })
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Room Type
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="text"
                    placeholder="Room Type"
                    value={state.rooms}
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_ROOMS,
                        payload: e.target.value,
                      })
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Address
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="text"
                    placeholder="Address"
                    value={state.address}
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_ADDRESS,
                        payload: e.target.value,
                      })
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Monthly Rent(in INR)
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="number"
                    placeholder="Monthly Rent"
                    value={state.monthlyRent}
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_MONTHLY_RENT,
                        payload: +e.target.value < 0 ? 0 : +e.target.value,
                      })
                    }}
                  />
                </div>

                <div className="mb-4">
                  <label className="block mb-2 text-sm font-bold text-gray-700">
                    Security Deposit Amount(in INR)
                  </label>
                  <input
                    className="w-full px-3 py-2 leading-tight text-gray-700 border rounded shadow appearance-none focus:shadow-outline focus:outline-none"
                    type="number"
                    placeholder="Security Deposit Amount"
                    value={state.securitDeposit}
                    onChange={(e) => {
                      dispatch({
                        type: ACTIONTYPES.UPDATE_SECURITY_DEPOSIT,
                        payload: +e.target.value < 0 ? 0 : +e.target.value,
                      })
                    }}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <button
                    className="w-full px-4 py-2 font-bold text-white bg-blue-500 rounded focus:shadow-outline hover:bg-blue-700 focus:outline-none"
                    type="button"
                    onClick={addPost}
                  >
                    Add Post
                  </button>
                </div>
                {error ? (
                  <p className="mt-2 text-xs italic text-red-500">{error}</p>
                ) : null}
                {success ? (
                  <p className="mt-2 text-xs italic text-lime-500">{success}</p>
                ) : null}
              </React.Fragment>
            )}
          </form>
        </div>
      </main>
    </React.Fragment>
  )
}
