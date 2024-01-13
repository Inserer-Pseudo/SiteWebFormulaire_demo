import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Table = () => {
    const [habitants, setHabitants] = useState([]);

    const getHabitants = () => {
        fetch('http://127.0.0.1:8001/habitant')
            .then(response => response.json())
            .then(json => setHabitants(json))
            .catch(error => console.error('Error fetching habitants:', error));
    }
    useEffect(() => {
        getHabitants();
    }, []);


    const handleDelete = (id) => {
        fetch(`http://127.0.0.1:8001/habitant/delete/${id}`, {
            method: 'DELETE'
        })
            .then(response => response.json())
            .then(json => getHabitants())
            .catch(error => console.error('Error deleting habitant:', error));
    }
    const handleCreate = (id) => {
        fetch(`http://127.0.0.1:8001/habitant/create`, {
            method: 'POST'
        })
            .then(response => response.json())
            .then(json => getHabitants())
            .catch(error => console.error('Error deleting habitant:', error));
    }


    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <p>Table</p>
                <button type="button" className="btn btn-primary" onClick={() => handleCreate()}>+</button>
            </div>
            {habitants.length === 0 ? (
                <div>Loading...</div>
            ) : (
                <table className="table table-hover">
                    <thead>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nom</th>
                            <th scope="col">Prenom</th>
                            <th scope="col">Adresse</th>
                            <th scope="col">Date de Naissance</th>
                            <th scope="col">Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {habitants.map((habitant, index) => {
                            let date = new Date(habitant.dateNaissance);
                            return (
                                <tr key={index} >
                                    <td scope="row">{habitant.id}</td>
                                    <td >{habitant.nom}</td>
                                    <td>{habitant.prenom}</td>
                                    <td>{habitant.adresse}</td>
                                    <td>{date.toDateString()}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger mx-2" onClick={() => { handleDelete(habitant.id) }}><DeleteIcon /></button>
                                        <button type="button" className="btn btn-primary"><EditIcon /></button>
                                    </td>

                                </tr>
                            )
                        })}

                    </tbody>
                </table>
            )}
        </div>
    );
}

export default Table;
