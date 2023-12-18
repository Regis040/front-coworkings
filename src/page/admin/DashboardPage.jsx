import { useNavigate } from "react-router-dom";
import HeaderAdmin from "../../component/admin/HeaderAdmin";
import { useEffect } from "react";

const DashboardPage = () => {
        //  Le Dashboard va rédirigé le user s'il s'est mal loggé
        // Je récupère la fonction navigate du react-router
        //  qui permet de rediriger un utilisateur
        const navigate = useNavigate();

        // au chargement du composant
        useEffect (() => {
          // Je récupère le token du local storage
        const token = localStorage.getItem("jwt");

        //  Si le token n'existe pas => Je redirige l'utilisateur vers le login
        if (!token) {
          navigate("/login");
        }

        // Idéalement, s'il y a un token existant,
        // on le décode (avec jwt-decode) et on regarde si les données sont correctes
        // si elles ne sont pas correctes (pas de clé data etc)
        // on redirige ...
});


  return (
    <>
      <HeaderAdmin />

      <h2>Vous êtes bien connecté en tant qu'admin</h2>
    </>
  );
};

export default DashboardPage;