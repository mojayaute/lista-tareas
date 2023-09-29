import DataTable from 'react-data-table-component';
import { Link } from "react-router-dom";
import TaskService from "../services/TaskService";
import React, { useState, useEffect, useRef } from "react";
import moment from 'moment';
import Swal from 'sweetalert2';


function Tasks() {
    const [tasks, setTasks] = useState([]);
    const [tasksBackup, settasksBackup] = useState([]);
    const refs = useRef([]);

    useEffect(() => {
        getTasks();
    }, []);

    const getTasks = () => {
        TaskService.getAll().then(response => {
            setTasks(response.data);
            settasksBackup(response.data);
        }).catch(e => {
            console.error(e);
        });
    }

    const deleteTask = (event) => {
        TaskService.destroy(event.target.dataset.id).then(response => {
            const res = response.data;
            console.log(res);
            if (res.status) {
                Swal.fire({
                    title: 'Done',
                    text: 'Tarea eliminada correctamente',
                    icon: 'success',
                }).then((result) => {
                    getTasks();
                });
            } else {
                Swal.fire({
                    title: 'Error',
                    text: 'Ha ocurrido un error intenta más tarde',
                    icon: 'error',
                }).then((result) => {
                    getTasks();
                });
            }
        }).catch(e => {
            console.error(e);
        });
    }

    const addLike = (event) => {
        let id = event.target.dataset.id;
        let likes =+ event.target.dataset.likes ? event.target.dataset.likes : 0;
        likes++;
        refs.current[event.target.dataset.id].textContent = likes;
        event.target.disabled = true;
        TaskService.update({"likes": likes}, id);
    }

    const columns = [
        {
            name: 'Titulo',
            selector: row => row.title,
            sortable: true,
        },
        {
            name: 'Creador',
            selector: row => row.creator,
            sortable: true,
        },
        {
            name: 'Estado',
            selector: row => row.state,
            sortable: true,
        },
        {
            name: 'Descripción',
            selector: row => row.description,
            sortable: true,
        },
        
        {
            name: 'Likes',
            selector: row => <button onClick={addLike} data-id={row.id} data-likes={row.likes} className='btn btn-sm btn-success'>Like <span ref={(element) => {refs.current[row.id] = element}} id={`task-like-${row.id}`} className='badge text-bg-light rounded-circle'>{row.likes}</span></button>,
            sortable: true,
        },
        {
            name: 'Fecha de creación',
            selector: row => moment(row.created_at).format('MM/DD/YYYY'),
            sortable: true,
        },
        {
            name: 'Opciones',
            cell: row => <button className='btn btn-sm btn-danger' data-id={row.id}  onClick={deleteTask}>Eliminar</button>,
        }
    ];

    const handleFilter = event => {
        if (event.target.value) {
            const filtered = tasks.filter(row => {
                return row.title.toLowerCase().includes(event.target.value.toLowerCase()) ||
                    row.state.toLowerCase().includes(event.target.value.toLowerCase())
            })
            setTasks(filtered);
        } else {
           setTasks(tasksBackup);
        }
    };

    return (
        <>
            <div className='container pt-5'>
                <div className="row mb-4">
                    <div className="col-md-6">
                        <h3>Tareas</h3>
                    </div>
                    <div className="col-md-6 text-end">
                        <Link to={"/task/save"} className='btn btn-dark'>Crear tarea</Link>
                    </div>
                </div>
                <div className="row justify-content-center">
                    <div className="col-md-12">
                        <div className="row justify-content-end mb-4">
                            <div className="col-md-4">
                                <input type="text" onChange={handleFilter} name="search" className='form-control' placeholder='Buscar' />
                            </div>
                        </div>
                        <div className='card p-4'>
                            <DataTable columns={columns} data={tasks} pagination  sortActive={false} />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Tasks
