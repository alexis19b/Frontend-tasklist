import React, { useEffect, useState } from 'react'
import { Cards } from './Cards';
import { CrearTarea } from './modals/CrearTarea';
import Swal from 'sweetalert2';
import { Search } from './Search';
import {SearchStatus} from './SearchStatus';

export const baseUrl = process.env.REACT_APP_API_URL;

export const TodoList = () => {
  const [modal, setModal] = useState(false);
  const [taskList, setTaskList] = useState([]);
  const [taskUpdated, setTaskUpdated] = useState(false)

  const [task, setTask] = useState({
    name: '',
    description: '',
    confirmed: 0
  })
  useEffect(() => {
    const getTaskList = () => {
      fetch(baseUrl+'tareas')
        .then((res) => res.json())
        .then((data) => setTaskList(data));
    };
    getTaskList();
    setTaskUpdated(false);
  }, [taskUpdated]);

  const toggle = () => {
    setModal(!modal);
  }
  const saveTask = () => {
    setModal(false);
    setTaskUpdated(true)
    Swal.fire('Guardado','Tarea Agregada', 'success');
  }
  return (
      <>
      <div className="header text-center d-flex flex-column">
       <h1>Lista de Tareas <i className="fas fa-pencil-alt d-block"></i></h1>
        <div className="botons">
        <button 
          className= "btn btn-dark  mr-2 text-white" 
          onClick={() => setModal(true)}>
            Crear Tarea
        </button>
        <Search setTaskList={setTaskList} setTaskUpdated={setTaskUpdated} />
        <SearchStatus  setTaskList={setTaskList} taskList={taskList} setTaskUpdated={setTaskUpdated} />
      </div>
      </div>
      <div className="task-container">
          {taskList.map((obj)=> 
              <Cards key={obj.id} taskObj= {obj} task={task} setTaskUpdated= {setTaskUpdated} />)}
      </div>
      <CrearTarea toggle={toggle} modal= {modal} task={task} setTask={setTask} save={saveTask}  />
    </>
  )
}
