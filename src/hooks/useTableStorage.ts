import React from "react";
import useSessingStorage from "./useLocalStorage";

const key = 'table'

function reducer(state: any, action: any) {
    const {payload, type} = action
    switch (type) {
        case "SET_STATE":
            return {...payload}
        case "SET_KEY":
            console.log(state.data)
            return {...state, key: payload, data: {...state.data}}
        case "ADD_ITEM":
            console.log(payload)
            return {
                ...state,
                data: {
                    ...state.data,
                    [payload.key]: state.data[payload.key] === undefined ? [payload.data] : [...state.data[payload.key], payload.data]
                }
            }
        default:
            throw new Error()
    }
}


const initialState = {
    key: null,
    data: {}
}

function useTableStorage() {
    const {getLocalStorage, setLocalStorage} = useSessingStorage()
    const [state, dispatch] = React.useReducer(reducer, getLocalStorage(key) === null ? initialState : getLocalStorage(key))


    React.useEffect(() => {
        const listener = () => {
            const newState = localStorage.getItem(key)
            newState !== JSON.stringify(state) && dispatch({
                type: "SET_STATE",
                payload: getLocalStorage(key)
            })
        }

        window.addEventListener('storage', listener)
        return () => window.removeEventListener('storage', listener)

    }, [key])

    React.useEffect(() => {
        setLocalStorage(key, state)
    }, [state])

    return [state, dispatch]
}

export default useTableStorage
