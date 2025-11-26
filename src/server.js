import app from './app.js';//import de l'app
import { env } from './config/env.js';//import des variables
import { testConnection } from './db/index.js';//import de la fonction de test de connexion

//function qui lance le server
async function start() {
    //verification que mysql répond
    await testConnection();
    //on lance express
    app.listen(env.port, ()=>{
        console.log(`serveur lancé sur le port ${env.port}`);
    })
}

//appelle de la function start
start();