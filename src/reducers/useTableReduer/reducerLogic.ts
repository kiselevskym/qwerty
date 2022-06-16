import { TableFormData } from "../../components/TableWindow";
import Data from "../../interfaces/Data";
import { TableState } from "./useTableReducer";

export interface AddHistoryItem {
  key: string;
  data: TableFormData;
}

class ReducerLogic {
  public setData(state: TableState, payload: Data): TableState {
    return {
      ...state,
      data: payload,
    };
  }

  public updateDataItemByKey(
    state: TableState,
    payload: { key: string; newValue: number }
  ): TableState {
    if (state.data === null) return { ...state };
    const { key, newValue } = payload;
    const [city, year, type]: string[] = key.split("-");
    return {
      ...state,
      data: {
        ...state.data,
        [city]: {
          G: {
            ...state.data[city].G,
            [year]: {
              ...state.data[city].G[+year],
              [type]: { value: newValue, dateRelease: "today" },
            },
          },
        },
      },
    };
  }

  public addHistoryItem(
    state: TableState,
    payload: AddHistoryItem
  ): TableState {
    const { key, data } = payload;
    const isExists = state.dataHistroy[key];

    if (isExists) {
      return {
        ...state,
        dataHistroy: {
          ...state.dataHistroy,
          [key]: [...state.dataHistroy[key], data],
        },
      };
    }
    return {
      ...state,
      dataHistroy: {
        ...state.dataHistroy,
        [key]: [data],
      },
    };
  }
}

export default new ReducerLogic();
