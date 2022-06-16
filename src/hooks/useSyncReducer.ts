import React from "react";
import { getLocalStorage, setLocalStorage } from "../helper/localStorageHelper";
import { Action } from "../interfaces/Action";

interface UseSyncReducerParams {
  reducer: React.Reducer<any, any>;
  initializerArg: unknown;
  key: string;
}

type UseSyncReducerReturn = [any, (action: Action<string>) => void];

const RESET_KEY = Symbol("reset state");

function reducerHOC(
  state: unknown,
  action: Action<string | Symbol>,
  reducer: React.Reducer<any, any>
): unknown {
  const { payload, type } = action;

  if (type === RESET_KEY) return { ...payload };

  return reducer(state, action);
}

export function useSyncReducer({
  reducer,
  initializerArg,
  key,
}: UseSyncReducerParams): UseSyncReducerReturn {
  const [state, dispatch] = React.useReducer(
    (state: unknown, dispatch: Action<any>) =>
      reducerHOC(state, dispatch, reducer),
    getLocalStorage(key) || initializerArg
  );

  React.useEffect(() => {
    const listener = () => {
      const newState = localStorage.getItem(key);

      if (newState && newState !== JSON.stringify(state)) {
        dispatch({ type: RESET_KEY, payload: JSON.parse(newState) });
      }
    };

    window.addEventListener("storage", listener);
    return () => window.removeEventListener("storage", listener);
  }, [key]);

  React.useEffect(() => {
    setLocalStorage(key, state);
  }, [state]);

  return [state, dispatch];
}
