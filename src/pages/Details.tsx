import React, {Dispatch} from 'react';
import WindowTable from "../components/WindowTable";
import IRowItem from "../interfaces/IRowItem";

type Props = {
    rows: IRowItem[],
    setRows: Dispatch<IRowItem[]>
}

const Details = ({rows, setRows}: Props) => {
    return (
        <div>
            <WindowTable rows={rows} setRows={setRows}/>
        </div>
    );
};

export default Details;
