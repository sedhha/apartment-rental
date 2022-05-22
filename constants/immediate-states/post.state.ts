// Contains Page Specific Reducers
// This needs not to be put in the Global State as these data points are supposed to be specific to pages

import { IResponse } from '@backend-utils/responsehandlers/synthesizer'

export interface IPostState {
  size: string
  rooms: string
  address: string
  monthlyRent: number
  securitDeposit: number
  error?: string
  success?: string
  loading: boolean
}

export interface IDatabasePostState {
  size: string
  rooms: string
  address: string
  monthlyRent: number
  securitDeposit: number
  uid: string
  docId?: string
}

export const initState: IPostState = {
  size: '500 sqft',
  rooms: '2 BHK',
  address: '',
  monthlyRent: 5000,
  securitDeposit: 10000,
  loading: false,
}

export const ACTIONTYPES = {
  UPDATE_SIZE: 'UPDATE_SIZE',
  UPDATE_ROOMS: 'UPDATE_ROOMS',
  UPDATE_ADDRESS: 'UPDATE_ADDRESS',
  UPDATE_MONTHLY_RENT: 'UPDATE_MONTHLY_RENT',
  UPDATE_SECURITY_DEPOSIT: 'UPDATE_SECURITY_DEPOSIT',
  UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE',
  UPDATE_LOADING: 'UPDATE_LOADING',
  UPDATE_SUCCESS_MESSAGE: 'UPDATE_SUCCESS_MESSAGE',
} as const

type ExpectedPayload = string | undefined | boolean | number

type ReducerAction = {
  type: keyof typeof ACTIONTYPES
  payload: ExpectedPayload
}

export const reducer = (
  state: IPostState,
  action: ReducerAction
): IPostState => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_SIZE:
      return {
        ...state,
        size: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_ROOMS:
      return {
        ...state,
        rooms: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_ADDRESS:
      return {
        ...state,
        address: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_MONTHLY_RENT:
      return {
        ...state,
        monthlyRent: action.payload as number,
      }
    case ACTIONTYPES.UPDATE_SECURITY_DEPOSIT:
      return {
        ...state,
        securitDeposit: action.payload as number,
      }
    case ACTIONTYPES.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload as string | undefined,
      }
    case ACTIONTYPES.UPDATE_SUCCESS_MESSAGE:
      return {
        ...state,
        success: action.payload as string | undefined,
      }
    case ACTIONTYPES.UPDATE_LOADING:
      return {
        ...state,
        loading: action.payload as boolean,
      }
    default:
      return state
  }
}

// APIs

export const addPostApi = async (firebaseToken: string, payload: IPostState) =>
  fetch('/api/auth/add-posts', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: firebaseToken,
    },
    body: JSON.stringify({ payload }),
  })
    .then((response) => response.json().then(dataHandler).catch(errorHandler))
    .catch(errorHandler)

const errorHandler = (error: unknown): { message: string; error: boolean } => {
  console.log('Error happened while making API Call = ', error)
  const expectation = (error as { message: string }).message
  if (expectation) return { message: expectation, error: true }
  else return { message: 'Unexpected Error Occured.', error: true }
}
const dataHandler = (data: IResponse): { message: string; error: boolean } => {
  if (data.error) return { message: data.message, error: true }
  else return { message: data.message, error: false }
}
