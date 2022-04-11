import React from 'react';
import data from './data'
import IData, {IYearValue} from "./interfaces/IData";
import WindowTable from "./components/WindowTable";
import ReactDOM from "react-dom";
import TableData from "./components/TableData";


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

function App() {
    const {years, ceil, body} = transformData(data)


    const openWindow = () => {
        const features = 'width=700, height=700';
        const externalWindow = window.open('', '', features);

        if (externalWindow) {
            let containerElement = externalWindow.document.createElement('div');
            externalWindow.document.body.appendChild(containerElement);
            ReactDOM.render(<WindowTable onCloseHandler={externalWindow.close}/>, containerElement)
        }
    }

    return (
        <div className="App">
            <TableData years={years} ceil={ceil} body={body} openWindowHandler={openWindow}/>
        </div>
    );
}

export default App;
