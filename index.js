//console.log('Desde node js :)')

import express from 'express';
import dotenv from 'dotenv';
import cors from "cors";
import conectarDB from './config/db.js';
import veterinarioRoutes from './routes/veterinarioRoutes.js';
import pacienteRoutes from './routes/pacientesRoutes.js'

const app = express();

app.use(cors()); //para el error de cors

app.use(express.json()); //le decimos que le enviaremos datos json

//este codigo tiene que ir antes de "conectarDB()"
dotenv.config();

conectarDB();

//"5173" es del frontend
// para utilizar postman comentar las variables "dominiosPermitidos" y "corsOptions"
/*const dominiosPermitidos = [process.env.FRONTEND_URL];

const corsOptions = {
    origin: function(origin, callback){
        if(dominiosPermitidos.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error('No permitido por cors'))
        }
    }
} 

app.use(cors(corsOptions));  */

// http://localhost:4000/api/veterinarios - para acceder a esto
app.use("/api/veterinarios", veterinarioRoutes);
app.use("/api/pacientes", pacienteRoutes);

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => {
    console.log(`Servidor funcionando jejeje en puerto: ${PORT}`)
});