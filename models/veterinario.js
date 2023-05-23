import mongoose from "mongoose";
import bcrypt from 'bcrypt';
import generarId from '../helpers/generarId.js';

//Estructura base de datos
/* NOTA, CADA VEZ QUE SE MODIFIQUE ALGO DE ACA, HAY QUE BORRARLO DE COMPASS LA CARPETA 
DONDE SE ALMACENA LOS DATOS...*/
const veterinarioSchema = mongoose.Schema({
    nombre: {
        type: String,
        required: true,
        trim: true
    },
    password: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },
    telefono: {
        type: String,
        default: null,
        trim: true
    },
    web: {
        type: String,
        default: null
    },
    token: {
        type: String,
        default: generarId()
    },
    confirmado: {
        type: Boolean,
        default: false
    }
});

//ocultar password o hashear
veterinarioSchema.pre('save', async function(next) {
    if(!this.isModified('password')) {
        next()
    }

    const salt = await bcrypt.genSalt(10);

    this.password = await bcrypt.hash(this.password, salt);
});

veterinarioSchema.methods.comprobarPassword = async function(
    passwordFormulario
) {
    return await bcrypt.compare(passwordFormulario, this.password);
};
 
//para registrar este modelo en mongoose
//'Nombre Veterinarios', es la carpeta en compass donde se almacenara los datos
const veterinario = mongoose.model('Nombre veterinarios', veterinarioSchema);

export default veterinario;