import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Swal from 'sweetalert2';
import { useNavigate } from "react-router-dom";
import TaskService from "../services/TaskService";


function Task() {

    const initTask = {
        title: "",
        description: "",
        likes: "",
        creator: "",
        state: ""
    }

    const [task, setTask] = useState(initTask);
    const [isError, setIsError] = useState(false);
    const [submitted, setSubmitted] = useState(false);
    const navigate = useNavigate();

    const handleInputChange = event => {
        const { name, value } = event.target;
        setTask({ ...task, [name]: value });
    };

    const saveTask = async (e) => {
        e.preventDefault();
        try {
            let newTask = {
                title: task.title,
                description: task.description,
                likes: task.likes,
                creator: task.creator,
                state: task.state
            }

            let res = await TaskService.save(newTask);
            let resData = res.data;
            if (resData.status) {
                Swal.fire({
                    title: 'Done',
                    text: 'Tarea agregada correctamente.',
                    icon: 'success',
                }).then((result) => {
                    navigate('/');
                });
            } else {
                console.log("Error -> ", resData);
                setIsError(true);
            }

            setSubmitted(true);
            setTask(initTask);

        } catch (error) {
            console.log("Error on [TaskForm | saveTask] -> ", error);
        }
    }

    useEffect(() => {
        setSubmitted(false);
    }, []);

    return (
        <>
            <div className='container pt-5'>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <h3>Crear tarea</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to={"/"} className='btn btn-dark'>Regresar</Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className='card p-4'>
                            {isError ? (
                                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                                    Ha ocurrido un error intenta más tarde.
                                    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
                                </div>
                            ) : (null)}
                            <form onSubmit={saveTask}>
                                <div className="row">
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <label className="form-label">Titulo:</label>
                                            <input type="text" name="title" value={task.title} onChange={handleInputChange} className="form-control" required />
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="mb-2">
                                            <label className="form-label">Nombre de creador:</label>
                                            <input type="text" name="creator" value={task.creator} onChange={handleInputChange} className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="mb-2">
                                            <textarea className="form-control" name="description" rows="4" onChange={handleInputChange} required>{task.description}</textarea>
                                        </div>
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4">
                                        <div className="mb-4">
                                            <label className="form-label">Estado:</label>
                                            <input type="text" name="state" value={task.state} onChange={handleInputChange} className="form-control" required />
                                        </div>
                                    </div>
                                </div>
                                <div>
                                    <button type="submit" className="btn btn-success mb-2">Guardar</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Task
