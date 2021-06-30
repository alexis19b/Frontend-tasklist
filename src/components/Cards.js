import React, {useState } from 'react';
import Swal from 'sweetalert2';
import EditTask from './modals/EditTask';
import { baseUrl } from './TodoList';

export const Cards = ({taskObj, setTaskUpdated}) => {
  
  const [cheked, setCheked] = useState(taskObj.confirmed)
  const [modal, setModal] = useState(false);
  const {id, name, description} =taskObj;

  const handleDelete = () => {
   
    const requesInit = {
      method: 'DELETE'
    }
    fetch(baseUrl+'tareas/'+ id,requesInit)
      .then(res=> res.json())
      .then(data=> console.log(data))

      Swal.fire('ELiminado','Eliminado Correctamente')
      setTaskUpdated(true);  
  }

  const toggle = () => {
    setModal(!modal)
  }
  const updateTask = () => {
    setModal(true);
    setTaskUpdated(true);
  }
  const handleCompleted = (e) => {

    let status = { confirmed: e.target.value };

    const requesInit = {
      method: "POST",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(status),
    };

    fetch(baseUrl+'confirmed/'+id, requesInit)
      .then((res) => res.json())
      .then((data) => setCheked(data));

    if (status.confirmed) {
      Swal.fire("Felicidades", "Tarea Completada", "success");
    } else Swal.fire("Estatus Cambiado", "Tarea Peniente", "success");
  };

  return (
    <div className="card-wrapper mr-5">
      <div className="card-top"></div>
      <div className="task-holder">
        <span 
          className= "card-header"
        >{name}
        </span>
        <p className="mt-2">{ description }</p>
      
        <div className="task-icons">
          <input
            className= "check"
            type="checkbox"
            defaultChecked={cheked}
            name="cheked"
            onChange={(e)=>handleCompleted({target:{name: e.target.name, value: e.target.checked}})}          
          />
           <i 
            className= "far fa-edit mr-3 icons-color cursor"
            onClick= {()=>updateTask()}
            >
          </i>
          <i 
            className= "fas fa-trash-alt icons-color-delete cursor"
            onClick={()=>handleDelete(id)}
          >
          </i>
        </div>
    </div> 
    <EditTask modal = {modal} toggle= {toggle}  taskObj={taskObj} updateTask= {updateTask} />    
    </div>
  );
  }
