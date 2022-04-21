import React from 'react';

import {
    Routes,
    Route,
} from "react-router-dom";
import Home from "./pages/Home";
import Details from "./pages/Details";
import IRowItem from "./interfaces/IRowItem";
import useTableStorage from "./hooks/useTableStorage";

function App() {
    const [state, setState] = React.useState<IRowItem[]>([])


    return (
        <div className="App">
            <Routes>
                <Route index element={<Home/>}/>
                <Route path={'details'} element={<Details/>}/>
            </Routes>,
        </div>
    );
}

export default App;
