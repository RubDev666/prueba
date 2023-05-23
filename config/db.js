import mongoose from "mongoose";

/* obtener el codigo en mondodb.com, buscar la opcion "connect" alado de "cluster",
y luego "connect you aplication" y ahi estara este codigo, y reemplazar "<password>",
por nuestra contraseña...

ese codigo meterlo en el archivo ".env" dentro de la variable "MONGO_URI="

ejecutar en terminal una dependencia para leerlo...
- npm i dotenv

importarla en el "index.js"

"process.env.MONGO_URI" en el away...
*/

const conectarDB = async () => {
    try {
        const db = await mongoose.connect(
            process.env.MONGO_URI, 
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );

        const url = `${db.connection.host}:${db.connection.port}`;

        console.log(`MongoDB conectado en: ${url}`)
    } catch (error) {
        console.log(`error: ${error.message}`);
        process.exit(1);
    }
};

export default conectarDB;