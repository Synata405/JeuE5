import React, { useState, useEffect } from "react";
import "./App.css";

function CreerPersonnage() {
  const [nom, setNom] = useState("");
  const [personnages, setPersonnages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const personnage = { nom };

    fetch("http://localhost:3001/addpersonnage", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(personnage),
    })
      .then((response) => response.json())
      .then((data) => {
        if (data.error) {
          throw new Error(data.error);
        }
        setPersonnages([...personnages, data]);
        setNom("");
      })
      .catch((error) => {
        console.error("Il y a eu une erreur!", error);
        setError(error.message);
      });
  };

  const fetchPersonnages = () => {
    fetch("http://localhost:3001/personnages")
      .then((response) => {
        if (!response.ok) {
          throw new Error('La requête GET a échoué');
        }
        return response.json();
      })
      .then((data) => {
        setPersonnages(data);
        setError(null);
      })
      .catch((error) => {
        console.error("Erreur lors de la récupération des personnages:", error);
        setError(error.message);
      });
  };

  useEffect(() => {
    fetchPersonnages();
  }, [personnages]);

  return (
    <>
      <div className=" bg-[#20232a] w-[300px] p-[20px] rounded-[10px] [box-shadow:0_0_20px_rgba(0,_0,_0,_0.5)] text-center fixed top-[20px]">
        <h1>Créer un Personnage</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group">
            <label>Nom:</label>
            <input
              type="text"
              value={nom}
              onChange={(e) => setNom(e.target.value)}
              required
            />
          </div>
          <button type="submit">Créer</button>
        </form>
      </div>
      <div className="persos">
        <ul>
          {personnages.map((personnage) => (
            <li key={personnage.id}>
              <p className="text-center">{personnage.nom}</p>
              <p><strong>Attaque :</strong> <br />{personnage.attaque}</p>
              <p><strong>Défense :</strong> <br /> {personnage.defense}</p>
              <p><strong>Vie :</strong> <br />{personnage.vie_actuelle}</p>
              <p><strong>Niveau :</strong> <br />{personnage.niveau}</p>
              <p><strong>Exp :</strong> <br />{personnage.exp_actuelle}/{personnage.exp_max}</p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default CreerPersonnage;
