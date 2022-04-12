import React, {Dispatch} from 'react';
import {Table, TableBody, TableCell, TableContainer, TableFooter, TableHead, TableRow} from "@mui/material";
import {useForm} from "react-hook-form";
import Input from "./fields/Input";
import IRowItem from "../interfaces/IRowItem";
import Select from "./fields/Select";


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

const WindowTable = ({rows, setRows}: Props) => {
    const {register, handleSubmit, reset} = useForm<Form>()
    const defaultUser = 'default user'

    const onWindowCloseHandler = () => {
        window.close()
    }


    const onSubmit = (data: Form) => {
        const date = new Date()
        const date_string = `${date.getDay()}-${date.getMonth() + 1}-${date.getFullYear()}`
        setRows([...rows,
            {
                value: +data.value,
                date: date_string,
                user: data.user,
                comment: data.comment
            }])
        reset({
            value: 0,
            user: defaultUser,
            comment: "",
        })
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
                        {rows.map((item) => (
                            <TableRow>
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

export default WindowTable;
