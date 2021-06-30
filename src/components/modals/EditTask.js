import React, { useEffect, useState } from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseUrl } from '../TodoList';

const EditTask = ({ modal, toggle, updateTask, taskObj }) => {
    
  const { id } = taskObj;

  const [task, setTask] = useState({
    name: "",
    description: "",
    confirmed: 0,
  });
  const { name, description } = task;

  const handleChange = (e) => {
    setTask({
      ...task,
      [e.target.name]: e.target.value,
    });
  };

  useEffect(() => {
    setTask({
      name: taskObj.name,
      description: taskObj.description,
      confirmed: taskObj.confirmed,
    });
  }, [taskObj]);

  const handleUpdate = (e) => {
    e.preventDefault();
    
    const requesInit = {
      method: "PUT",
      headers: { "Content-type": "application/json" },
      body: JSON.stringify(task),
      
    };
    
    fetch(baseUrl+'tareas/'+ id, requesInit)
      .then((res) => res.json())
      .then((data) => setTask(data));
      
      updateTask();
      toggle();
      Swal.fire('Guardado','Actualizado Correctamente');

  };

  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Actualizar Tarea</ModalHeader>
      <ModalBody>
        <div className="form-group">
          <label>Nombre de la Tarea</label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={handleChange}
            name="name"
          />
        </div>
        <div className="form-group">
          <label>Description</label>
          <textarea
            rows="5"
            className="form-control"
            value={description}
            onChange={handleChange}
            name="description"
          ></textarea>
        </div>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleUpdate}>
          {" "}
          Actualizar{" "}
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          {" "}
          Cancelar{" "}
        </Button>
      </ModalFooter>
    </Modal>
  );
};

export default EditTask;
        
