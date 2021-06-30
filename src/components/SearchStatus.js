import React, { useState } from 'react';
import { baseUrl } from './TodoList';

export const SearchStatus = ({setTaskList, setTaskUpdated}) => {
  const [completed, setCompleted] = useState({
    confirmed: null
  });
  
  const getStatus = (status) => {

      fetch(baseUrl+'completed/'+status)
      .then((res) => res.json())
      .then((data) => setTaskList(data));
  }
   const handleStatus =(e) => {
  
    let status = { confirmed: e.target.value };  
    setCompleted(status.confirmed)

    switch (status.confirmed) {
      case "0":  
        getStatus(status.confirmed);
      break;
      case "1":
        getStatus(status.confirmed);
      break;
      case "2":
        setTaskUpdated(true);
      break;
    
      default:
        break;
    }
  }
  return ( 
      <form>
      <label className="p-status ml-3">Estatus</label>
      <select
        className="form-search-status"
        onChange={handleStatus}
        value={completed}
      > 
        <option value={2}>Todas</option>
        <option value={1}>Tareas Completadas</option>
        <option value={0}>Tareas Pendientes</option>
      </select>
      </form>    
  );
}
