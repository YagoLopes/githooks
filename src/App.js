import React, { useState, useEffect } from "react";

function App() {
  const [repositories, setRespositories] = useState([]);

  //Você pode criar mais de um useEffect
  //Não é legal ter apenas um useEffect englobando toda a regra

  useEffect(() => {
    async function fetchData() {
      const response = await fetch(
        "https://api.github.com/users/YagoLopes/repos"
      );
      const data = await response.json();
      setRespositories(data);
    }

    fetchData();
    //O Array vazio significa que não exite comparações para executar novamente
  }, []);

  useEffect(() => {
    const filtered = repositories.filter((repo) => repo.favorite);

    document.title = `Você tem ${filtered.length} favoritos`;
  }, [repositories]);

  function handleFavorite(id) {
    const newRepositories = repositories.map((repo) => {
      return repo.id === id ? { ...repo, favorite: !repo.favorite } : repo;
    });
    setRespositories(newRepositories);
  }

  return (
    <>
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>
            {repo.name}
            {repo.favorite && <span>(Favorito)</span>}
            <button onClick={() => handleFavorite(repo.id)}>Favoritar</button>
          </li>
        ))}
      </ul>
    </>
  );
}

export default App;
