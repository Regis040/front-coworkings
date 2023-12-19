import { useState } from "react";

const AdminCoworkingCreate = () => {
  // je créé un state pour afficher un message de succès ou d'erreur
    const [message, setMessage] = useState(null);

  //3. je créé une fonction appelée par mon event listener
  // pour créer un coworking
  // la fonction est asynchrone, car on fait un fetch à l'intérieur
    const handleCreateCoworking = async (event) => {
  // j'empêche le rechargement par défaut de la page au submit
        event.preventDefault();
  // 2. Je récupère les données du formulaire
        const name = event.target.name.value;
        const priceByMonth = event.target.priceByMonth.value;
        const priceByDay = event.target.priceByDay.value;
        const priceByHour = event.target.priceByHour.value;
        const addressNumber = event.target.addressNumber.value;
        const addressStreet = event.target.addressStreet.value;
        const addressCity = event.target.addressCity.value;
        const addressPostcode = event.target.addressPostcode.value;
        const superficy = event.target.superficy.value;
        const capacity = event.target.capacity.value
    // 4. je créé un objet dont les propriétés qui portent des  valeurs
    // qui correspond à ce que l'api attend (modèle / table)
    // les noms doivent correspondre
    // et les types aussi
        const coworkingToCreate = {
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

        //    5. Je transforme ces données en Json
          const coworkingToCreateJson = JSON.stringify(coworkingToCreate);
// 6. Je récupère mon token du localStorage
          const token = localStorage.getItem("jwt");
// 7. Je lance un fetch sur l'api
// En métode POST
// En lui indiquant que j'ai l'autorisation (token)
// Et que je veux que les données du form soient inscrites dans mon body
          const createCoworkingResponse = await fetch("http://localhost:3000/api/coworkings", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + token, // clé : valeur
            },
            body: coworkingToCreateJson,
          });
    // 8. si la réponse de création du coworking a un status 201 (réussi)
    // je créé un message de succès
    // sinon d'erreur
          if (createCoworkingResponse.status === 201) {
            setMessage("Coworking créé !")
          } else {
            setMessage("Erreur !")
          }


    }
    return (
            <>

            {message && <p>{message}</p>}

            {/* 1. Je créé un formulaire afin de récupèrer les données qui doivent coller avec le model de l'API */}
        <form onSubmit ={handleCreateCoworking}>
                <div>
                    <label>
                        Nom
                        <input type="text" name="name" />
                    </label>
                </div>
                <div>
                    <label>
                        Prix par mois
                        <input type="number" name="priceByMonth" />
                    </label>
                </div>
                <div>
                    <label>
                        Prix par jour
                        <input type="number" name="priceByDay" />
                    </label>
                </div>
                <div>
                    <label>
                        Prix par heure
                        <input type="number" name="priceByHour" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Numéro
                        <input type="text" name="addressNumber" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Rue
                        <input type="text" name="addressStreet" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Ville
                        <input type="text" name="addressCity" />
                    </label>
                </div>
                <div>
                    <label>
                        Adresse : Postcode
                        <input type="text" name="addressPostcode" />
                    </label>
                </div>
                <div>
                    <label>
                        Superficie
                        <input type="number" name="superficy" />
                    </label>
                </div>
                <div>
                    <label>
                        Capacité
                        <input type="number" name="capacity" />
                    </label>
                </div>

                <input type="submit" />
        </form>
            </>
    )
}
export default AdminCoworkingCreate;