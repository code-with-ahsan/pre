import { PropsWithChildren, createContext, useReducer } from "react";

export const MAX_NUM = 5; 

export const getRandomValue = () => {
  return Math.floor(Math.random() * MAX_NUM + 1).toString();
}

type State = {
  randomValue: string;
  state: 'idle' | 'success' | 'failure'
}

const initialState: State = {
  randomValue: getRandomValue(),
  state: 'idle'
}

type Actions =
| {type: 'guessValue', payload: string}
| {type: 'randomizeValue'}

type GuessContext = State & {
  guessValue: (val: string) => void;
  randomizeValue: () => void
}
export const GuesserContext = createContext<GuessContext>({
  randomValue: '',
  state: 'idle',
  guessValue: () => {
   
  },
  randomizeValue: () => {
   
  }
});



const reducer = (state: State, action: Actions): State => {
  switch (action.type) {
    case 'randomizeValue':
      return {
        ...state,
        randomValue: getRandomValue(),
        state: 'idle'
      }
    case 'guessValue': 
      return {
        ...state,
        state: action.payload === state.randomValue ? 'success' : 'failure'
      }
    default:
      break;
  }
  return state;
}

export const GuesserContextProvider = ({
  children
}: PropsWithChildren) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return <GuesserContext.Provider value={{
    ...state,
    guessValue(val: string) {
      dispatch({type: 'guessValue', payload: val})
    },
    randomizeValue() {
      dispatch({type: 'randomizeValue'})
    }
  }}>
    {children}
  </GuesserContext.Provider>
}