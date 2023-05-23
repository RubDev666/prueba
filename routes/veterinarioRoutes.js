import express from 'express';
import {
    registrar, 
    perfil, 
    confirmar, 
    autenticar, 
    olvidePass,
    comprobarToken,
    nuevoPass,
    actualizarPerfil,
    actualizarPassword
} from '../controllers/veterinarioController.js';
import checkAuth from '../middleware/authMiddleware.js';

const router = express.Router();

// estas son las rutas area publica
// http://localhost:4000/api/veterinarios/perfil - asi se va accediendo... 
router.post('/', registrar); // post, cuando envias datos al servidor
router.get('/confirmar/:token', confirmar); //:token, es una ruta dinamica
router.post('/login', autenticar);
router.post('/olvide-pass', olvidePass);

// estas 2 lineas se pueden simplificar...
//router.get('/olvide-password/:token', comprobarToken);
//router.get('/olvide-password/:token', nuevoPass);

router.route('/olvide-pass/:token').get(comprobarToken).post(nuevoPass);

// areas privadas
router.get('/perfil', checkAuth, perfil); // get, es obtener datos del servidor
router.put('/perfil/:id', checkAuth, actualizarPerfil);
router.put("/actualizar-pass", checkAuth, actualizarPassword);

export default router;