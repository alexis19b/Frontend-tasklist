import { useState } from 'react';
import Swal from 'sweetalert2';
import { useForm } from '../hooks/useForm';
import { baseUrl } from './TodoList';

export const Search = ({setTaskList, setTaskUpdated}) => {

  const [cheking, setCheking] = useState(false)
  const [formValues, handleInputChange, reset] = useForm({
    searchText: ''
  });
  const {searchText} = formValues; 

  const handleSearch = (e)=> {
    e.preventDefault();
    
    if(searchText === '') {
      Swal.fire('Error', 'Debe llenar el campo', 'error')
    } else {
      
      setCheking(!cheking);
        
      fetch(baseUrl+'search/'+searchText)
        .then((res) => res.json())
        .then((data) => setTaskList(data));
        
        reset();
    }

  }
  const handleBack = ()=> {
    setTaskUpdated(true);
    setCheking(!cheking);
  }
  return (
      <>
      <form  onSubmit={handleSearch}>
       <input  
          type= "text" 
          placeholder="Buscar por nombre"
          autoComplete="off"
          className="form-search"
          name="searchText"
          value={searchText}
          onChange={handleInputChange}        
        />
        <button 
          type="submit"
          className="btn btn-primary ml-2"
        >
          Buscar
        </button>
      {
        cheking &&
        <button
          type="submit"
          className="btn btn-primary mt-1 ml-2"
          onClick ={handleBack}
        >
          Regresar
        </button> 
      }
       </form> 
    </>
  )
}
