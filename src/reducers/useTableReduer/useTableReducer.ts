import React from "react";
import { TableFormData } from "../../components/TableWindow";
import localStorageKeys from "../../constants/localStorageKeys";
import data from "../../data";
import { useSyncReducer } from "../../hooks/useSyncReducer";
import { Action } from "../../interfaces/Action";
import IData from "../../interfaces/Data";
import reducerLogic from "./reducerLogic";
import { setData } from "./tableActions";

const KEY = localStorageKeys.table;

export enum TableActions {
  setData = "SET_DATA",
  updateDataItemByKey = "UPDATE_DATA_ITEM_BY_KEY",
  addDataHistoryItem = "ADD_DATA_HISTORY_ITEM",
}

type DataHistroy = {
  [key: string]: TableFormData[];
};

export interface TableState {
  data: IData | null;
  dataHistroy: DataHistroy;
}

function reducer(state: TableState, action: Action<TableActions>): TableState {
  const { payload, type } = action;

  switch (type) {
    case TableActions.setData:
      return reducerLogic.setData(state, payload);
    case TableActions.updateDataItemByKey:
      return reducerLogic.updateDataItemByKey(state, payload);
    case TableActions.addDataHistoryItem:
      return reducerLogic.addHistoryItem(state, payload);
    default:
      return { ...state };
  }
}

const initialState: TableState = {
  data: {},
  dataHistroy: {},
};

function useTableReducer() {
  const [state, dispatch] = useSyncReducer({
    reducer,
    initializerArg: initialState,
    key: KEY,
  });

  React.useEffect(() => {
    dispatch(setData(data));
  }, [KEY]);

  return [state, dispatch];
}

export default useTableReducer;
