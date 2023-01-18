
// pure redux (sans redux toolkit)

export const INCREMENT_COUNTER = "INCREMENT_COUNTER"
export const DECREMENT_COUNTER = "DECREMENT_COUNTER"

export interface CounterState {
    data: number;
    title: string;
}

//initial state
const initialState: CounterState = {
    data: 42,
    title: 'YARC'
}

// action creators
export function increment(amount = 1) {
    return {
        type: INCREMENT_COUNTER,
        payload: amount
    }
}

export function decrement(amount = 1) {
    return {
        type: DECREMENT_COUNTER,
        payload: amount
    }
}

//le reducer
export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state,
                data: state.data + action.payload
            }

        case DECREMENT_COUNTER:
            return {
                ...state,
                data: state.data - action.payload
            }

        default:
            return state;
    }
}