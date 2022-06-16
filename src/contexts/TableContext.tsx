import React from "react";
import useTableReducer from "../reducers/useTableReduer/useTableReducer";

const TableContext = React.createContext<[any, any]>([undefined, undefined]);

interface Props {
  children: JSX.Element;
}

export function TableContextProvider({ children }: Props) {
  const [state, dispatch] = useTableReducer();

  return (
    <TableContext.Provider value={[state, dispatch]}>
      {children}
    </TableContext.Provider>
  );
}

export default TableContext;
