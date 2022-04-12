import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";

function App() {
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

    return (
        <div className="App">
            <BrowserRouter>
                <Routes>
                    <Route index element={<Home/>}/>
                    <Route path={'details'} element={<Details rows={state} setRows={setState} />}/>
                </Routes>
            </BrowserRouter>,
        </div>
    );
}

export default App;
