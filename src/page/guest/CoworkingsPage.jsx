import React, { useEffect, useState } from "react";
import Header from "../../component/guest/Header";
import { Link } from "react-router-dom";

const CoworkingsPage = () => {
  const [coworkings, setCoworkings] = useState(null);

  useEffect(() => {
    (async () => {
      const coworkingsResponse = await fetch("http://localhost:3000/api/coworkings");

      const coworkingsResponseData = await coworkingsResponse.json();

      setCoworkings(coworkingsResponseData);
    })();
  }, []);

  return (
    <>
      <Header />

      <h1>Liste des coworkings : </h1>

      {coworkings ? (
        <>
          {coworkings.map((coworking) => {
            return (
              <article>
                <h2>{coworking.name}</h2>
                <Link to={`/coworking/details/${coworking.id}`}>Voir le coworking</Link>
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

export default CoworkingsPage;