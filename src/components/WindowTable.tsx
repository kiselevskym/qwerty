import React from 'react';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


type Props = {
    onCloseHandler: () => void
}

const WindowTable = ({onCloseHandler}: Props) => {
    const [number, setNumber] = React.useState<number>(0)
    const [user, setUser] = React.useState<string>("Default User")
    const [comment, setComment] = React.useState("")


    const [state, setState] = React.useState([{
        value: 555,
        date: '20.01.2020',
        user: 'Max',
        comment: 'any'
    }, {
        value: 5668,
        date: '21.01.2020',
        user: 'Kate',
        comment: ''
    }])


    const onAddHandler = () => {
        const date = new Date()
        const date_string = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`
        setState([...state, {value: number, comment: comment, user, date: date_string}])
        setNumber(0)
        setUser("Default User")
        setComment("")
    }

    return (
        <div>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>value</TableCell>
                            <TableCell>date</TableCell>
                            <TableCell>user</TableCell>
                            <TableCell>comment</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {state.map(item => (
                            <TableRow>
                                <TableCell>{item.value}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.user}</TableCell>
                                <TableCell>{item.comment}</TableCell>
                            </TableRow>
                        ))}
                        <TableRow>
                            <TableCell><input value={number}
                                              onChange={(e) => setNumber(+e.target.value)}
                                              type="number"/></TableCell>
                            <TableCell>today</TableCell>
                            <TableCell>
                                <select value={user}
                                        onChange={e => setUser(e.target.value)}>
                                    <option value="Default User" selected>По умолчанию</option>
                                    <option value="USER1">USER1</option>
                                    <option value="USER2">USER2</option>
                                    <option value="USER3">USER3</option>
                                </select>
                            </TableCell>
                            <TableCell><input value={comment}
                                              onChange={(e) => setComment(e.target.value)}
                                              type="text"/></TableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <button onClick={onCloseHandler}>Close</button>
            <button onClick={onAddHandler}>Add</button>
        </div>
    );
};

export default WindowTable;
