//notre outil de hashge de mdp
import bcrypt from 'bcrypt';
//notre outil de gestion des token
import jwt from 'jsonwebtoken';
//connexion a mysql
import { pool } from '../db/index.js';
//mes variable d'environnements
import { env } from '../config/env.js';
//import des services
import { register } from '../services/auth.service.js';

export async function registerController (req, res, next) {
    try {
       
        //appeler ma funciton qui contient ma logique de register
        const user = await register(req.body)
        //la response
        res.status(201).json({
            success: true,
            message:"user créé",
            data: user
        })
    } catch (error) {
        console.error('erreur lors de la creation du compte', error);
        next(error);
    }
}

export async function loginController (req, res, next) {
    try {
        //on recupere email et mdp
        const { email, password} = req.body;
        //on cherche le user dans db
        const [rows] = await pool.execute('SELECT * FROM users WHERE email = ?', [email]);
        const user = rows[0];
        
        //on gere le cas ou on ne trouve pas de user
        if(!user){
            console.log('user introuvable');
            return res.status(401).json({error: 'user introuvable'});
        }
        //On compare le mdp fournis avec le mdp hash de la db
        const match = await bcrypt.compare(password, user.password_hash);
        if(!match) {
            console.log('mdp incorrect');
            return res.status(401).json({error:'mdp incorrect'});
        }
        //on genere un token avec jwt
        const token = jwt.sign(
            {sub: user.id, email: user.email}, //payload (info minimum du token)
            env.jwtSecret, //clé secret de mon .env que je recupere via mon fichier env.js
            { expiresIn: '1h'} //durée de validité du token
        )
        //on rpepare la response (avec le token)
        res.json({token})
    } catch (error) {
        console.error('erreur lors du login', error);
        next(error);
    }
}

//controller profile
export async function profileController(req, res) {
    console.log(req.user);
    res.json({user: req.user});
}
