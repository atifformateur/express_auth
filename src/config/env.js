//importer l'outil dotenv
import dotenv from 'dotenv';

dotenv.config();

// lister et verifier les infos necessaires pour demarrer l'app
const required = ['DB_HOST', 'DB_USER', 'DB_NAME', 'JWT_SECRET'];
for(const key of required) {
    if(!process.env[key]){
        throw new Error(`${key}: manquant dans le fichier .env`);
    }
}

// recuperer les information de mon fichier .env
export const env = {
    port: process.env.PORT ?? 4000,
    db: {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT ?? 3306),
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD ?? '',
        database: process.env.DB_NAME
    },
    jwtSecret: process.env.JWT_SECRET
}

