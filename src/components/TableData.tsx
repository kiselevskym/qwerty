import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";


type Props = {
    years: { title: string, colSpan: number }[],
    ceil: string[],
    body: { [city: string]: string[] },
    openWindowHandler: () => void
}


const TableData = ({years, ceil, body, openWindowHandler}: Props) => {
    return (
        <TableContainer component={Paper} >
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell rowSpan={2}>regions</TableCell>
                        {years.map(item =>
                            <TableCell colSpan={item.colSpan} align="center">{item.title}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        {ceil.map(item => <TableCell align={"center"}>{item}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(body).map(([city_name, values]) =>
                        <TableRow>
                            <TableCell align="center">{city_name}</TableCell>
                            {values.map(item => <TableCell onClick={openWindowHandler} align="center"
                                                           colSpan={1}>{item}</TableCell>)}
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableData;
