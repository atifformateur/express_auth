//import de notre outil qui gere les routes
import { Router } from 'express';
//importer nos controller
import { 
    registerController,
    loginController,
    profileController
 } from '../controllers/auth.controller.js';
//import de notre logique d'authenticate
import { authenticate } from '../middlewares/auth.middleware.js';

const router = Router();

//route pour s'enregistrer
router.post('/register', registerController);
//router pour se log (login)
router.post('/login', loginController);
//afficher son profil
router.get('/profil', authenticate, profileController);

export default router;