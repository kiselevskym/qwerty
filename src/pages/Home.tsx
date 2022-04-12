import React from 'react';
import TableData from "../components/TableData";
import useData from "../hooks/useData";


const Home = () => {
    const data = useData()



    return (
        <div>
            <TableData data={data}/>
        </div>
    );
};

export default Home;
