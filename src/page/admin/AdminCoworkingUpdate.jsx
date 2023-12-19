import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminCoworkingUpdate = () => {
    // fonction hook qui permet de prendre l'id en paramètre et donc d'identifier l'élement concerné
  const { id } = useParams();
//   fonction hook qui permet d'afficher deux rendus; le premier null et le second avec le coworking identifié
  const [coworking, setCoworking] = useState(null);

  const [message, setMessage] = useState(null);
// fonction hook qui permet le stockage dans la variable coworking (via la fonction setCoworking), une fois, des données attendues en async
// les données sont récupèrées dans le body avec le "si coworking existe alors afficher les données dans le formulaire"
  useEffect(() => {
    (async () => {
      const coworkingResponse = await fetch("http://localhost:3000/api/coworkings/" + id);
      const coworkingResponseData = await coworkingResponse.json();
      setCoworking(coworkingResponseData.data);
    })();
  }, [id]);

// Je récupère les lignes dans AdminCoworkingsPage:
// qui avec un clic sur le submit récupère toutes les données du formulaire
  const handleUpdateCoworking = async (event) => {
    event.preventDefault();

    const name = event.target.name.value;
    const priceByMonth = event.target.priceByMonth.value;
    const priceByDay = event.target.priceByDay.value;
    const priceByHour = event.target.priceByHour.value;
    const addressNumber = event.target.addressNumber.value;
    const addressStreet = event.target.addressStreet.value;
    const addressCity = event.target.addressCity.value;
    const addressPostcode = event.target.addressPostcode.value;
    const superficy = event.target.superficy.value;
    const capacity = event.target.capacity.value;

// ... les données sont placées dans un objet dont chaque nom est l'identique du mofdel de l'API
    const coworkingUpdateData = {
      name: name,
      price: {
        month: priceByMonth,
        day: priceByDay,
        hour: priceByHour,
      },
      address: {
        number: addressNumber,
        street: addressStreet,
        city: addressCity,
        postCode: addressPostcode,
      },
      superficy: superficy,
      capacity: capacity,
    };
// Les données sont transformé en json
    const coworkingUpdateDataJson = JSON.stringify(coworkingUpdateData);
// On récupère le token dans le localStorage
    const token = localStorage.getItem("jwt");
// On effectue un fetch en métode PUT sur une id via l'API
// autorisée grâce token récupéré
// Les données de ensuite envoyé sur le body
    const updateCoworkingResponse = await fetch("http://localhost:3000/api/coworkings/" + id, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      body: coworkingUpdateDataJson,
    });
// on gére la mise à jour du coworking identifié par un message
    if (updateCoworkingResponse.status === 201) {
      setMessage("Mise à jour OK");
    } else {
      setMessage("Erreur");
    }
  };

  return (
    <div>
    {/* si le coworking existe alors je récupère le formulaire pré-rempli avec les données du coworking identifié avec son id
    le "defaultvalue" permet la modification des champs et donc leur mis à jour 
     + affichage du message qui gère l'échec ou la réussite de la mise à jour*/}
    <>{message && <p>{message}</p>}</>
      {coworking && (
        <form onSubmit={handleUpdateCoworking}>
          <div>
            <label>
              Nom
              <input type="text" name="name" defaultValue={coworking.name} />
            </label>
          </div>
          <div>
            <label>
              Prix par mois
              <input type="number" name="priceByMonth" defaultValue={coworking.price.month} />
            </label>
          </div>
          <div>
            <label>
              Prix par jour
              <input type="number" name="priceByDay" defaultValue={coworking.price.day} />
            </label>
          </div>
          <div>
            <label>
              Prix par heure
              <input type="number" name="priceByHour" defaultValue={coworking.price.hour} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Numéro
              <input type="text" name="addressNumber" defaultValue={coworking.address.number} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Rue
              <input type="text" name="addressStreet" defaultValue={coworking.address.street} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Ville
              <input type="text" name="addressCity" defaultValue={coworking.address.city} />
            </label>
          </div>
          <div>
            <label>
              Adresse : Postcode
              <input type="text" name="addressPostcode" defaultValue={coworking.address.postCode} />
            </label>
          </div>
          <div>
            <label>
              Superficie
              <input type="number" name="superficy" defaultValue={coworking.superficy} />
            </label>
          </div>
          <div>
            <label>
              Capacité
              <input type="number" name="capacity" defaultValue={coworking.capacity} />
            </label>
          </div>

          <input type="submit" />
        </form>
      )}
    </div>
  );
};

export default AdminCoworkingUpdate;