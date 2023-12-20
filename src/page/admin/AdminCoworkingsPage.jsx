import React, { useEffect, useState } from "react";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { jwtDecode } from "jwt-decode";
// Ce composant a pour objectif de créer une route qui permet à une personne autorisée à supprimer un élement, ici 1 coworking
// Une route a donc été créée sur App.js
const AdminCoworkingsPage = () => {
    // Une fonction hook useState est  créée afin d'être utilisée deux fois:
    // d'abord pour un premier rendu puis pour un second qui montre le résultat de l'action de DELETE
  const [coworkings, setCoworkings] = useState(null);

  // Je récupère le token dasn le localStorage puis je decode npm install jwt-decode
  const token = localStorage.getItem("jwt");
  const decodedToken = jwtDecode(token);

    // Je récupère tous les coworkings dans une variable afin qu'ils apparaissent lors de mon premier rendu
  useEffect(() => {
    (async () => {
      const coworkingsResponse = await fetch("http://localhost:3000/api/coworkings");
      const coworkingsResponseData = await coworkingsResponse.json();
    //   ...premier rendu : coworkings.map .....
      setCoworkings(coworkingsResponseData);
    })();
  }, []);

//   Au clic que le bouton "supprimer", la fonction handleDeleteCoworking récupère deux paramètres que sont l'event et l'id du coworking à supprimer
  const handleDeleteCoworking = async (event, coworkingId) => {
    // cette action est possible si un token a bien été récupéré  et que donc l'utilisateur a bien été identifié.
    const token = localStorage.getItem("jwt");
    // Une requête de suppression du coworking est envoyé via l'API
    //Le coworking est identifié grâce à son id
    await fetch("http://localhost:3000/api/coworkings/" + coworkingId, {
        // La méthode est DELETE 
      method: "DELETE",
    //   On envoie à l'API le token pour authoriser la suppression
      headers: { Authorization: "Bearer " + token },
    });
    // On récupère le nouveau coworkings ( avec la suppression du coworking)
    const coworkingsResponse = await fetch("http://localhost:3000/api/coworkings");
    const coworkingsResponseData = await coworkingsResponse.json();

    // un nouveau rendu est affiché avec la suppression
    setCoworkings(coworkingsResponseData);
  };

  return (
    <>
    <HeaderAdmin />
      <h1>Liste des coworkings : </h1>

      {coworkings ? (
        <>
          {coworkings.map((coworking) => {
            return (
              <article>
                <h2>{coworking.name}</h2>
                {/* Pour la gestion de deux paramètres que sont event(par défaut) et l'id du coworking:
                la fonction "onClick" fait appel une autre fonction qui prend les deux paramètres */} 
                {/* J'ai pris soin de récupèrer l'id du role de l'utilisateur et si l'itilisateur est superadmin ou admin
                le bouton supprimer apparait*/}
                {decodedToken.data.role !== 3 && (
                  <button onClick={(event) => handleDeleteCoworking(event, coworking.id)}>Supprimer</button>
                )}
              </article>
            );
          })}
        </>
      ) : (
        <p>En cours de chargement</p>
      )}
    </>
  );
};

export default AdminCoworkingsPage;