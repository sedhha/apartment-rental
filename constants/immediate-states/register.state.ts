// Contains Page Specific Reducers
// This needs not to be put in the Global State as these data points are supposed to be specific to pages

export interface IRegisterState {
  email: string
  password: string
  reEnterPassword: string
  error?: string
}

export const initState: IRegisterState = {
  email: '',
  password: '',
  reEnterPassword: '',
}

export const ACTIONTYPES = {
  UPDATE_EMAIL: 'UPDATE_EMAIL',
  UPDATE_PASSWORD: 'UPDATE_PASSWORD',
  UPDATE_RE_ENTER_PASSWORD: 'UPDATE_RE_ENTER_PASSWORD',
  UPDATE_ERROR_MESSAGE: 'UPDATE_ERROR_MESSAGE',
} as const

type ExpectedPayload = string | undefined

type ReducerAction = {
  type: keyof typeof ACTIONTYPES
  payload: ExpectedPayload
}

export const reducer = (
  state: IRegisterState,
  action: ReducerAction
): IRegisterState => {
  switch (action.type) {
    case ACTIONTYPES.UPDATE_EMAIL:
      return {
        ...state,
        email: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_PASSWORD:
      return {
        ...state,
        password: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_RE_ENTER_PASSWORD:
      return {
        ...state,
        reEnterPassword: action.payload as string,
      }
    case ACTIONTYPES.UPDATE_ERROR_MESSAGE:
      return {
        ...state,
        error: action.payload,
      }
    default:
      return state
  }
}
