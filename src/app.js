import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import authRoutes from './routes/auth.routes.js';
import demoRoutes from './routes/demo.routes.js';

const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan());

//petite route de test
app.get('/test', (req, res)=>{
    console.log('route de test ok');
    res.send('route de test ok');
})

//route parent pour l'auth
app.use('/api/auth', authRoutes);
app.use('/api/demo', demoRoutes);

//middleware qui gere les erreurs, capture tout type d'erreur et renvoi une response
app.use((err, req, res, next)=>{
    console.error(err);
    res.status(err.status || 500).json({
        error: err.message || 'erreur serveur'
    });
});

export default app;
