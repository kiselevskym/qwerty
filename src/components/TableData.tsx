import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import IData from "../interfaces/IData";
import useWindowOpen from "../hooks/useWindowOpen";


interface transformDataProps {
    years: { title: string, colSpan: number }[],
    ceil: string[],
    body: { [city: string]: string[] }
}


//I assume that everything was sorted on the server
function transformData(data: IData): transformDataProps {
    const object: IData = JSON.parse(JSON.stringify(data))

    // default value if there is no value in the data
    const defaultValue = '-'

    //information about TableHead
    //i using the Set so all values is unique
    //I assumed that there could be more values(XX,YY,ZZ...) for one year
    const header: { [year: string]: Set<string> } = {}
    //information about TableBody
    const body: { [city: string]: string[] } = {}


    //header
    Object.values(object).forEach(value => {
        Object.entries(value.G).map((years) => {
            const [key, value] = years
            const names = Object.keys(value)
            if (header[key]) {
                names.forEach(name => header[key].add(name))
            } else {
                header[key] = new Set([...names])
            }
        })
    })


    //body
    Object.keys(object).map(city_name => {
        body[city_name] = []

        Object.entries(header).map(([year, types]) => {
            types.forEach(type => {
                const city_name_year = data[city_name].G[year]

                if (city_name_year) {
                    const value = city_name_year[type]
                    value ? body[city_name].push("" + value.value) : body[city_name].push(defaultValue)
                } else {
                    body[city_name].push(defaultValue)
                }
            })
        })
    })

    const years = Object.entries(header).map(([key, value]) => ({
        title: key,
        colSpan: value.size,
    }))

    // @ts-ignore
    const ceil = Array.from(Object.values(header).reduce((acc, set) => acc.concat([...set]), []))


    return {
        years,
        ceil,
        body,
    }
}


type Props = {
    data: IData,
    openWindowHandler?: () => void
}

const TableData = ({data, openWindowHandler}: Props) => {
    const showPopup = useWindowOpen('/details')
    const {years, ceil, body} = transformData(data)


    return (
        <TableContainer component={Paper}>
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
                            {values.map(item => <TableCell onClick={showPopup} align="center"
                                                           colSpan={1}>{item}</TableCell>)}
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableData;
