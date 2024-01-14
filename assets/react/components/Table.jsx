import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.css';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import Edit from './Modal.jsx';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const Table = () => {
    const [habitants, setHabitants] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [edit, setEdit] = useState({});
    const [show, setShow] = useState(false);
    const [nom, setNom] = useState('');
    const [prenom, setPrenom] = useState('');
    const [adresse, setAdresse] = useState('');
    const [dateNaissance, setDateNaissance] = useState('');
    const [genre, setGenre] = useState('Homme');
    const [errors, setErrors] = useState({});
    const [id, setId] = useState('');

    const handleSubmit = (action) => {
        const errors = {};
        if (!nom) {
            errors.nom = 'Le nom est obligatoire';
        }
        if (!prenom) {
            errors.prenom = 'Le prénom est obligatoire';
        }
        if (!adresse) {
            errors.adresse = 'L\'adresse est obligatoire';
        }
        if (!dateNaissance) {
            errors.dateNaissance = 'La date de naissance est obligatoire';
        }
        if (!genre) {
            errors.genre = 'Le genre est obligatoire';
        }
        setErrors(errors);
        console.log(errors);
        if (Object.keys(errors).length === 0) {
            if (action === 'create') {
                handleCreate();
                setShow(false);
            } else {
                handleEdit();
                setShowModal(false);
            }



        }
    }

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

        let tmpDate = dateNaissance;
        let formatDate = tmpDate.getDate() + '/' + (tmpDate.getMonth() + 1) + '/' + tmpDate.getFullYear();
        setNom('');
        setPrenom('');
        setAdresse('');
        setDateNaissance('');
        setGenre('');



        fetch(`http://127.0.0.1:8001/habitant/create`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: nom,
                prenom: prenom,
                adresse: adresse,
                genre: genre,
                dateNaissance: formatDate
            })
        })
            .then(response => response.json())
            .then(json => getHabitants())
            .catch(error => console.error('Error creating habitant:', error));
    }

    const handleEdit = () => {

        let tmpDate = dateNaissance;
        let formatDate = tmpDate.getDate() + '/' + (tmpDate.getMonth() + 1) + '/' + tmpDate.getFullYear();
        setNom('');
        setPrenom('');
        setAdresse('');
        setDateNaissance('');
        setGenre('');



        fetch(`http://127.0.0.1:8001/habitant/edit/${id}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                nom: nom,
                prenom: prenom,
                adresse: adresse,
                genre: genre,
                dateNaissance: formatDate
            })
        })
            .then(response => response.json())
            .then(json => getHabitants())
            .catch(error => console.error('Error creating habitant:', error));
    }

    const handleChange = (e, label) => {

        switch (label) {
            case 'nom':
                setNom(e.target.value);
                break;
            case 'prenom':
                setPrenom(e.target.value);
                break;
            case 'adresse':
                setAdresse(e.target.value);
                break;
            case 'dateNaissance':
                setDateNaissance(new Date(e.target.value));
                break;
            case 'genre':
                setGenre(e.target.value);
                break;
            default:
                break;
        }
        //reset label error 
        const newErrors = { ...errors };
        delete newErrors[label];
        setErrors(newErrors);

    }

    return (
        <div>
            {showModal &&
                <Modal show={showModal} onHide={() => setShowModal(false)}>
                    <Modal.Header closeButton>
                        <Modal.Title>Edit habitant</Modal.Title>
                    </Modal.Header>
                    <Modal.Body><div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Nom</span>
                            <input type="text" className="form-control" placeholder="Nom" aria-label="Nom" aria-describedby="basic-addon1" value={nom} onChange={(e) => { handleChange(e, 'nom') }} />

                        </div>
                        {errors.nom && <p className="text-danger fs-6">{errors.nom}</p>}
                    </div>
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">Prénom</span>
                                <input type="text" className="form-control" placeholder="Prénom" aria-label="Prénom" aria-describedby="basic-addon1" value={prenom} onChange={(e) => handleChange(e, 'prenom')} />

                            </div>
                            {errors.prenom && <p className="text-danger fs-6">{errors.prenom}</p>}
                        </div>
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">Adresse</span>
                                <input type="text" className="form-control" placeholder="Adresse" aria-label="Adresse" aria-describedby="basic-addon1" value={adresse} onChange={(e) => handleChange(e, 'adresse')} />

                            </div>
                            {errors.adresse && <p className="text-danger fs-6">{errors.adresse}</p>}
                        </div>
                        <div className='mb-3'>
                            <div className="input-group">
                                <span className="input-group-text" id="basic-addon1">Date de Naissance</span>
                                <input type="date" className="form-control" placeholder="Date de Naissance" aria-label="Date de Naissance" aria-describedby="basic-addon1" value={dateNaissance.getFullYear() + '-' + ("0" + (dateNaissance.getMonth() + 1)).slice(-2) + '-' + ("0" + dateNaissance.getDate()).slice(-2)} onChange={(e) => handleChange(e, 'dateNaissance')} />

                            </div>
                            {errors.dateNaissance && <p className="text-danger fs-6">{errors.dateNaissance}</p>}
                        </div>
                        <div className='mb-3'>
                            <select className="form-select" aria-label="Default select example" value={genre} onChange={(e) => handleChange(e, 'genre')}>
                                <option value="Homme">Homme</option>
                                <option value="Femme">Femme</option>
                                <option value="Non binaire">Non binaire</option>
                            </select>
                            {errors.dateNaissance && <p className="text-danger fs-6">{errors.genre}</p>}
                        </div></Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={() => { setShowModal(false); setErrors({}) }}>
                            Close
                        </Button>
                        <Button variant="primary" onClick={() => (handleSubmit('edit'))}>
                            Save Changes
                        </Button>
                    </Modal.Footer>
                </Modal>}
            <div className='d-flex justify-content-between align-items-center'>
                <p>Table</p>
                <button type="button" className="btn btn-primary" onClick={() => setShow(true)}>+</button>
            </div>
            {show &&
                <div>
                    <hr />
                    <div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Nom</span>
                            <input type="text" className="form-control" placeholder="Nom" aria-label="Nom" aria-describedby="basic-addon1" onChange={(e) => { handleChange(e, 'nom') }} />

                        </div>
                        {errors.nom && <p className="text-danger fs-6">{errors.nom}</p>}
                    </div>
                    <div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Prénom</span>
                            <input type="text" className="form-control" placeholder="Prénom" aria-label="Prénom" aria-describedby="basic-addon1" onChange={(e) => handleChange(e, 'prenom')} />

                        </div>
                        {errors.prenom && <p className="text-danger fs-6">{errors.prenom}</p>}
                    </div>
                    <div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Adresse</span>
                            <input type="text" className="form-control" placeholder="Adresse" aria-label="Adresse" aria-describedby="basic-addon1" onChange={(e) => handleChange(e, 'adresse')} />

                        </div>
                        {errors.adresse && <p className="text-danger fs-6">{errors.adresse}</p>}
                    </div>
                    <div className='mb-3'>
                        <div className="input-group">
                            <span className="input-group-text" id="basic-addon1">Date de Naissance</span>
                            <input type="date" className="form-control" placeholder="Date de Naissance" aria-label="Date de Naissance" aria-describedby="basic-addon1" onChange={(e) => handleChange(e, 'dateNaissance')} />

                        </div>
                        {errors.dateNaissance && <p className="text-danger fs-6">{errors.dateNaissance}</p>}
                    </div>
                    <div className='mb-3'>
                        <select className="form-select" aria-label="Default select example" defaultValue="Homme" onChange={(e) => handleChange(e, 'genre')}>
                            <option value="Homme">Homme</option>
                            <option value="Femme">Femme</option>
                            <option value="Non binaire">Non binaire</option>
                        </select>
                        {errors.genre && <p className="text-danger fs-6">{errors.genre}</p>}
                    </div>


                    <div className='d-flex justify-content-between'>
                        <button type="button" className="btn btn-danger" onClick={() => { setShow(false); setErrors({}) }}><CloseIcon /> Close </button>
                        <button type="button" className="btn btn-primary" onClick={() => handleSubmit('create')}>Submit <CloudUploadIcon /></button>
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
                            <th scope="col">Genre</th>
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
                                    <td>{habitant.genre}</td>
                                    <td>
                                        <button type="button" className="btn btn-danger mx-2" onClick={() => { handleDelete(habitant.id) }}><DeleteIcon /></button>
                                        <button type="button" className="btn btn-primary" onClick={() => { setShowModal(true); setNom(habitant.nom); setAdresse(habitant.adresse); setDateNaissance(new Date(habitant.dateNaissance)); setGenre(habitant.genre); setPrenom(habitant.prenom); setId(habitant.id) }}><EditIcon /></button>
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
