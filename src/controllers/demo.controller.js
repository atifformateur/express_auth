//outil qu'on a créé pour se connecter a la db
import { pool } from '../db/index.js';

//function de recherche avec request préparée
export async function searchUserSafe(req, res, next) {
    try {
        const {email} = req.query;
        
        console.log('get email', email);
        

        const [rows] = await pool.execute(
            'SELECT id, email, created_at FROM users WHERE email = ?',
            [email]
        );
        console.log('result request', rows);

        return res.json({
            message:"requete avec execute",
            data: rows
        })
    } catch (error) {
        console.log('erreur', error);
        next(error);
    }
}

export async function searchUserUnsafe(req, res, next) {
    try {
        const {email} = req.query;
        console.log('get email', email);

        const sql = `SELECT id, email, created_at FROM users WHERE email = '${email}'`;
        console.log(sql);

        const [rows] = await pool.query(sql);

        return res.json({
            message:"requete avec query",
            data: rows
        })
        
    } catch (error) {
        console.log('erreur', error);
        next(error);
    }
}