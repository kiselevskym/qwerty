import React from 'react';
import {Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@mui/material";
import IData from "../interfaces/IData";
import useWindowOpen from "../hooks/useWindowOpen";
import useTableStorage, {setKey} from "../hooks/useTableStorage";


interface transformDataProps {
    years: { title: string, colSpan: number }[],
    ceil: string[],
    body: { [city: string]: { value: string, key: null | string }[] }
}


//I assume that everything was sorted on the server
function transformData(data: IData): transformDataProps {
    const object: IData = JSON.parse(JSON.stringify(data))


    Object.keys(object).map(cityName => {
        Object.values(object[cityName].G).map(value => {
            console.log(value)
            const computedValue = value.ZZ.value * value.YY.value
            value['WW'] = {value: computedValue, dateRelease: '-'}
        })
    })


    // default value if there is no value in the data
    const defaultValue = {value: '-', key: null}

    //information about TableHead
    //i using the Set so all values is unique
    //I assumed that there could be more values(XX,YY,ZZ...) for one year
    const header: { [year: string]: Set<string> } = {}
    //information about TableBody
    const body: { [city: string]: { value: string, key: null | string }[] } = {}


    //header
    Object.values(object).forEach(cityName => {
        Object.entries(cityName.G).forEach((years) => {
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
    Object.keys(object).forEach(cityName => {
        body[cityName] = []


        Object.entries(header).forEach(([year, types]) => {
            types.forEach(type => {
                const cityName_year = object[cityName].G[year]

                if (cityName_year) {
                    const value = cityName_year[type]
                    value ? body[cityName].push({
                        value: "" + cityName_year[type].value,
                        key: `${cityName}-${year}-${type}`
                    }) : body[cityName].push(defaultValue)
                } else {
                    body[cityName].push(defaultValue)
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
}

const TableData = ({data}: Props) => {
    const {years, ceil, body} = transformData(data)
    const showPopup = useWindowOpen('/details')
    const [, dispatch] = useTableStorage()


    const onCellClickHandler = (key: string | null) => {
        if (key !== null) {
            dispatch(setKey(key))
            showPopup()
        }
    }

    return (
        <TableContainer component={Paper}>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell rowSpan={2}>regions</TableCell>
                        {years.map((item, index) =>
                            <TableCell key={index} colSpan={item.colSpan} align="center">{item.title}</TableCell>)}
                    </TableRow>
                    <TableRow>
                        {ceil.map((item, index) => <TableCell key={index} align={"center"}>{item}</TableCell>)}
                    </TableRow>
                </TableHead>
                <TableBody>
                    {Object.entries(body).map(([city_name, values], index) =>
                        <TableRow key={index}>
                            <TableCell align="center">{city_name}</TableCell>
                            {values.map((item, index) => <TableCell key={index}
                                                                    onClick={() => onCellClickHandler(item.key)}
                                                                    align="center"
                                                                    colSpan={1}>{item.value}</TableCell>)}
                        </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TableData;
