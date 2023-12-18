const LoginPage = () => {

        const handleLogin = async (event) => { // peut etre placé en async car c'est du handle et donc permet du await plus bas
            // Evite que le navigatueur se réinitialise lors du "submit"
            event.preventDefault();
            // Je récupère ces deux données tapées par le user en front
            const username = event.target.username.value;
            const password = event.target.password.value;

            // console.log(username, password);


                // je créé objet en json avec username et password
                // je fais un fetch de type POST sur mon API login, en incluant le json
                // si l'api valide => jwt dans la réponse
                // sinon => erreur dans la réponse

            // Je récupère ces données que je place dans un objet
            const loginData = {
                username,
                password,
            }
            // Je transforme ces données en Json
            const loginDataJson = JSON.stringify(loginData);


            // Je vais chercher la route du login, en méthode "post", en précisant qu'il s'agit de Json
            // et  j'envoie mes données login/username
            const loginResponse = await fetch("http://localhost:3000/api/users/login", {
                method: "POST",
                headers : {
                    "content-Type": "application/json",
                },
                body: loginDataJson,
            })
            
                // la réponse de l'api est renvoyée au front en json
                const loginResponseData = await loginResponse.json();
                // et le token est reçu
                const token = loginResponseData.data;

                console.log(token);               

        }

    return (
        <section>
            <form onSubmit={handleLogin}>
                <label>
                    username
                    <input type="text" name="username" />
                </label>
                <label>
                    password
                    <input type="password" name="password"/>
                </label>
                <label>
                    <input type="submit" />
                </label>
            </form>
        </section>
    )
}
export default LoginPage;