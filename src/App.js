import React, { useState, useEffect }  from "react";
import api from './services/api';

import "./styles.css";

function App() {

  const [repositories, setRepositories] = useState([]);

  async function handleAddRepository() {
    const response = await api.post('repositories', {
      "title": `repositorio ${Date.now()}`, 
      "url": "igor.quiter.io",
      "techs":"['oi', 'tchau']"
    })
    const newRepository = response.data;

    setRepositories([...repositories, newRepository]);
  }

  async function handleRemoveRepository(id) {
    const response = await api.delete(`repositories/${id}`)

    if(response.status === 204){
     const repositoryIndex = repositories.findIndex(repository => repository.id === id);
      repositories.splice(repositoryIndex,1);
      
      setRepositories([...repositories]);
    }
  }

  useEffect(()=>{
    api.get('repositories').then(response => {
      setRepositories(response.data);
    })
  },[]);

  return (
    <div>
      <ul data-testid="repository-list">
        {repositories.map(repository => {
          return(
            <li key={repository.id}>
              {repository.title}

              <button onClick={() => handleRemoveRepository(repository.id)}>
                Remover
              </button>
            </li>
          )
        })}
      </ul>

      <button onClick={handleAddRepository}>Adicionar</button>
    </div>
  );
}

export default App;
