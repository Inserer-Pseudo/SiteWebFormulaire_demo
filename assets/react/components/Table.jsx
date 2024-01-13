//import useEffect

import React, { useEffect, useState } from 'react';


const Table = ()=> {

console.log(data);
const [data, setData] = useState({});
useEffect(() => {
    fetch('http://127.0.0.1:8001/messages')
        .then(response => response.json())
        .then(json => setData(json));
},[]);


    return (
        <div>
            {/*//check if datta has data*/}
            {data.data ?  
            
            <table>
            <thead>
                <tr>
                    <th>Id</th>
                    <th>First Name</th>
                    <th>Last Name</th>
                </tr>
            </thead>
            <tbody>
                {data.data.map((item, index) => (
                    <tr key={index}>
                        <td>{item.id}</td>
                        <td>{item.first_name}</td>
                        <td>{item.last_name}</td>
                    </tr>
                ))}
            </tbody>
        </table>: 
        <div>Loading ...</div>}
            
        </div>
        
    )
}


export default Table;