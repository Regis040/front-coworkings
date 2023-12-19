import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const AdminCoworkingUpdate = () => {
    // fonction hook qui permet de prendre l'id en paramètre et donc d'identifier l'élement concerné
  const { id } = useParams();
//   fonction hook qui permet da'fficher deux rendus; le premier null et le second avec le coworking identifié
  const [coworking, setCoworking] = useState(null);
// fonction hook qui permet le stockage dans la variable coworking (via la fonction setCoworking), une fois, des données attendues en async
// les données sont récupèrées dans le body avec le "si coworking existe alors afficher les données dans le formulaire"
  useEffect(() => {
    (async () => {
      const coworkingResponse = await fetch("http://localhost:3000/api/coworkings/" + id);
      const coworkingResponseData = await coworkingResponse.json();
      setCoworking(coworkingResponseData.data);
    })();
  }, [id]);

  return (
    <div>
    {/* si le coworking existe alors je récupère le formulaire pré-rempli avec les données du coworking identifié avec son id
    le "defaultvalue" permet la modification des champs et donc leur mis à jour 
    */}
      {coworking && (
        
        <form>
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