// Contains Page Specific Reducers
// This needs not to be put in the Global State as these data points are supposed to be specific to pages

import { IResponse } from '@backend-utils/responsehandlers/synthesizer'
import { IApproveUserPayload } from 'pages/api/auth/approve-user'
import { IShowInterestPayload } from 'pages/api/auth/show-interest'

export interface IPostState {
  size: string
  rooms: string
  address: string
  monthlyRent: number
  securitDeposit: number
  error?: string
  success?: string
  loading: boolean
  posts: IDatabasePostState[]
  selfPosts: IDatabasePostState[]
}

export interface IDatabasePostState {
  size: string
  rooms: string
  address: string
  monthlyRent: number
  securitDeposit: number
  uid: string
  docId?: string
  isAvailable?: boolean
  interestedUsers?: { uid: string; email: string }[]
  approvedUser?: string
}

export const initState: IPostState = {
  size: '500 sqft',
  rooms: '2 BHK',
  address: '',
  monthlyRent: 5000,
  securitDeposit: 10000,
  loading: false,
  posts: [],
  selfPosts: [],
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
  UPDATE_POST_DATA: 'UPDATE_POST_DATA',
  UPDATE_SELF_POST_DATA: 'UPDATE_SELF_POST_DATA',
} as const

type ExpectedPayload =
  | string
  | undefined
  | boolean
  | number
  | IDatabasePostState[]

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
    case ACTIONTYPES.UPDATE_POST_DATA:
      return {
        ...state,
        posts: action.payload as IDatabasePostState[],
      }
    case ACTIONTYPES.UPDATE_SELF_POST_DATA:
      return {
        ...state,
        selfPosts: action.payload as IDatabasePostState[],
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

export const getPostsApi = async (
  firebaseToken: string
): Promise<IDatabasePostState[]> =>
  fetch('/api/auth/get-posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: firebaseToken,
    },
  })
    .then((response) =>
      response
        .json()
        .then((data) => {
          if (data.error) return [] as IDatabasePostState[]
          else return data.payload as IDatabasePostState[]
        })
        .catch(getErrorHandler)
    )
    .catch(getErrorHandler)

export const showInterestApi = async (
  firebaseToken: string,
  payload: IShowInterestPayload
): Promise<{ error: boolean; message: string }> =>
  fetch('/api/auth/show-interest', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: firebaseToken,
    },
    body: JSON.stringify({ payload }),
  })
    .then((response) => response.json().then(dataHandler).catch(errorHandler))
    .catch(errorHandler)

export const getSelfPostApi = async (
  firebaseToken: string
): Promise<IDatabasePostState[]> =>
  fetch('/api/auth/get-self-posts', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      Authorization: firebaseToken,
    },
  })
    .then((response) =>
      response
        .json()
        .then((data) => {
          if (data.error) return [] as IDatabasePostState[]
          else return data.payload as IDatabasePostState[]
        })
        .catch(getErrorHandler)
    )
    .catch(getErrorHandler)

export const aproveUserApi = async (
  firebaseToken: string,
  payload: IApproveUserPayload
): Promise<{ error: boolean; message: string }> =>
  fetch('/api/auth/approve-user', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: firebaseToken,
    },
    body: JSON.stringify({ payload }),
  })
    .then((response) => response.json().then(dataHandler).catch(errorHandler))
    .catch(errorHandler)

// Api Helpers
const getErrorHandler = () => [] as IDatabasePostState[]

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
