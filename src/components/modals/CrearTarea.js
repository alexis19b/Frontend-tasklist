import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';
import Swal from 'sweetalert2';
import { baseUrl } from '../TodoList';

export const CrearTarea = ({modal, toggle, save, task, setTask}) => {

  const handleChange = (e) => {
      setTask({
        ...task,
        [e.target.name]: e.target.value 
      })
  }
  const {name, description} = task;

  const handleSave = ()=> {
    //Validacion de los datos
    if( name === '' || description === '') {
      Swal.fire('Lo siento', 'El título y la descripcion son obligatorios!', 'error')
      return
    }
    //Peticion
    const requesInit = {
      method: 'POST',
      headers: {'Content-type': 'application/json'},
      body: JSON.stringify(task)
    }
    fetch(baseUrl+'tareas',requesInit)
      .then(res=> res.json())
      .then(data=> setTask(data))
        save(setTask);
  }
  return (
    <Modal isOpen={modal} toggle={toggle}>
      <ModalHeader toggle={toggle}>Crear Tarea</ModalHeader>
      <ModalBody>
        <form>
          <div 
            className="form-group">
            <label>Nombre de la Tarea</label>
            <input 
              type="text" 
              className="form-control"
              placeholder="Nombre de la tarea"
              name="name"
              value= {name}
              onChange= {handleChange}
           />
          </div>
          <div 
            className="form-group">
              <label>Descripción</label>
            <textarea 
                rows="5" 
                className="form-control"
                placeholder="Describe aqui la tarea"
                name="description"
                value={description}
                onChange={handleChange}
              >
            </textarea>
          </div>
        </form>
      </ModalBody>
      <ModalFooter>
        <Button color="primary" onClick={handleSave}>
          Guardar
        </Button>{" "}
        <Button color="secondary" onClick={toggle}>
          Cancelar
        </Button>
      </ModalFooter>
    </Modal>
  );
}
