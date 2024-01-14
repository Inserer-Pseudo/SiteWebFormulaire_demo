import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
const Table = () => {
    const [habitants, setHabitants] = useState([]);

    const [show, setShow] = useState(true);
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
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: 'ui',
                prenom: 'ui',
                adresse: 'ui',
                genre: 'test',
                dateNaissance: '14/01/2024'
            })
        })
            .then(response => response.json())
            .then(json => getHabitants())
            .catch(error => console.error('Error creating habitant:', error));
    }


    return (
        <div>
            <div className='d-flex justify-content-between align-items-center'>
                <p>Table</p>
                <button type="button" className="btn btn-primary" onClick={() => setShow(true)}>+</button>
            </div>
            {show &&
                <div>
                    <hr />
                    <div class="input-group mb-3">
                        <span className="input-group-text" id="basic-addon1">Name</span>
                        <input type="text" class="form-control" placeholder="Username" aria-label="Name" aria-describedby="basic-addon1"/>
                    </div>
                </div>}

            {!habitants ? (
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
