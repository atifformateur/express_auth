import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { pool } from '../db/index.js';
import { env } from '../config/env.js';

export async function register({email, password, birth_date, birth_place}) {
    // validation basique (si les champs sont présent)
    if(!email || !password || !birth_date || !birth_place ) {
       const error = new Error('email, mdp, date de naissance et lieu de naissance obligatoire');
       error.status = 400;
       throw error;
    }
    console.log(email, birth_date, birth_place, password);
    //hash du mdp
    const hash = await bcrypt.hash(password, 10); 
    //enregistrer l'utilisateur dans la db
    const query = `INSERT INTO users (email, password_hash, birth_date, birth_place) VALUES (?,?,?,?)`;
    const [result] = await pool.execute(query, [email, hash, birth_date, birth_place]);

    return {
        id: result.insertId,
        email, 
        created_at: new Date()
    }
}