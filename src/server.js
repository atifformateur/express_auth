import app from './app.js';
import { env } from './config/env.js';
import { testConnection } from './db/index.js';

async function start() {
    await testConnection();

    app.listen(env.port, ()=>{
        console.log(`serveur lancé sur le port ${env.port}`);
    })
}

start();