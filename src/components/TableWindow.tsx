import React, {Dispatch} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {useForm} from "react-hook-form";
import Input from "./fields/Input";
import IRowItem from "../interfaces/IRowItem";
import Select from "./fields/Select";
import useTableStorage from "../hooks/useTableStorage";
import useSessingStorage from "../hooks/useLocalStorage";

type Props = {
    rows: IRowItem[],
    setRows: Dispatch<IRowItem[]>
}

type Form = {
    value: number,
    date: string,
    user: string,
    comment: string
}

const TableWindow = () => {

    const {register, handleSubmit, reset} = useForm<Form>()
    const defaultUser = 'default user'


    const onWindowCloseHandler = () => {
        window.close()
    }
    const [state, dispatch] = useTableStorage()

    const onSubmit = (data: Form) => {
        const date = new Date()
        const date_string = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`

        const item = {
            value: +data.value,
            date: date_string,
            user: data.user,
            comment: data.comment
        }

        dispatch({type: "ADD_ITEM", payload: {key: state.key, data: item}})

        reset({
            value: 0,
            user: defaultUser,
            comment: "",
        })
    }
    console.log(state)
    if (state.key === null) return <div>error</div>
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
                        {state.data[state.key] && state.data[state.key].map((item: any, index: any) => (
                            <TableRow key={index}>
                                <TableCell>{item.value}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>{item.user}</TableCell>
                                <TableCell>{item.comment}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                    <TableFooter>
                        <TableRow>
                            <TableCell>
                                <Input name={'value'} type={'number'} register={register}/>
                            </TableCell>
                            <TableCell>
                                today
                            </TableCell>
                            <TableCell>
                                <Select data={['user1', 'user2']} name={'user'} register={register}
                                        defaultOption={defaultUser}/>
                            </TableCell>
                            <TableCell>
                                <Input name={'comment'} register={register}/>
                            </TableCell>
                        </TableRow>
                    </TableFooter>
                </Table>
            </TableContainer>
            <button onClick={onWindowCloseHandler}>Close</button>
            <button onClick={handleSubmit(onSubmit)}>Add</button>
        </div>
    );
};

export default TableWindow;
