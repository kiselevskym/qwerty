import { Action } from "../../interfaces/Action";
import Data from "../../interfaces/Data";
import { AddHistoryItem } from "./reducerLogic";
import { TableActions } from "./useTableReducer";

const setData = (value: Data): Action<TableActions> => ({
  type: TableActions.setData,
  payload: value,
});

const updateDataItemByKey = (value: any): Action<TableActions> => ({
  type: TableActions.updateDataItemByKey,
  payload: value,
});
const addDataHistoryItem = (value: AddHistoryItem): Action<TableActions> => ({
  type: TableActions.addDataHistoryItem,
  payload: value,
});

export { setData, updateDataItemByKey, addDataHistoryItem };
