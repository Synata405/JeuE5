import React, { useState, useEffect } from "react";

function Creermonstre() {
  const [nom, setNom] = useState("");
  const [exp, setExp] = useState("");
  const [vie, setVie] = useState("");
  const [attaque, setAttaque] = useState("");
  const [monstres, setMonstres] = useState([]);
  const [error, setError] = useState(null); // État pour stocker les erreurs

  const handleSubmit = (e) => {
    e.preventDefault();

    const monstre = { nom, exp, vie, attaque };

    fetch("http://localhost:3001/addmonstre", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(monstre),
    })
      .then((response) => response.text())
      .then((data) => {
        console.log(data);
        alert("Monstre ajouté avec succès");
        setNom("");
        setExp("");
        setVie("");
        setAttaque("");
        fetchMonstres();
      })
      .catch((error) => {
        console.error("Il y a eu une erreur!", error);
      });
  };

  const fetchMonstres = () => {
    fetch("http://localhost:3001/monstres")
      .then((response) => {
        if (!response.ok) {
          throw new Error('La requête GET a échoué');
        }
        return response.json();
      })
      .then((data) => {
        setMonstres(data);
        setError(null); // Réinitialise l'état de l'erreur
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des monstres:", error);
        setError(error.message); // Stocke l'erreur dans l'état
      });
  };

  useEffect(() => {
    fetchMonstres();
  }, []);

  return (
    <div className="App">
      <h1>Ajouter un Monstre</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Nom: </label>
          <input
            type="text"
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Exp: </label>
          <input
            type="text"
            value={exp}
            onChange={(e) => setExp(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Vie: </label>
          <input
            type="text"
            value={vie}
            onChange={(e) => setVie(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Attaque: </label>
          <input
            type="text"
            value={attaque}
            onChange={(e) => setAttaque(e.target.value)}
            required
          />
        </div>
        <button type="submit">Ajouter</button>
      </form>
      <div>
        <h2>Monstres ajoutés :</h2>
        {error && <p>Erreur : {error}</p>} {/* Affiche l'erreur si elle existe */}
        <ul>
          {monstres.map((monstre, index) => (
            <li key={index}>
              <strong>Nom :</strong> {monstre.nom}, <strong>Exp :</strong>{" "}
              {monstre.exp}, <strong>Vie :</strong> {monstre.vie},{" "}
              <strong>Attaque :</strong> {monstre.attaque}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Creermonstre;
