import UsuariosService from "../services/usuarios.service.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import pkg from 'pg';
const { Client } = pkg;
const jwtkey = "clavesupersegurajwt";
import cors from 'cors';
app.use(express.json());
app.use(cors());

const register = async (req, res) => {
        const client = new Client(config);
        try {
        await client.connect();
        const usuario = req.body;
        const existingUser = await client.query('SELECT * FROM usuarios WHERE email = $1', [usuario.email]);
        
        if (existingUser.rows.length > 0) {
            return res.status(400).json({ error: 'El email ya está en uso' });
        }
        const hashed =  await bcrypt.hash( usuario.password, 10)
        console.log("usuario", usuario)
        console.log("hashed", hashed)
        let result = await client.query(
          "INSERT INTO usuarios(nombre, apellido, email, password) VALUES($1, $2, $3, $4)", 
          [usuario.nombre, usuario.apellido, usuario.email, hashed]
      )}
        catch (e) {
            res.status(500).json({ error: 'No se puede crear el usuario' });
            await client.end();
        }
        console.log(result.rows)
        res.send(result.rows)

        

    // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo usuario
            2. Verificar que el campo usuario tenga los campos nombre, apellido, email y password
            3. Verificar que no exista un usuario con el mismo email (utilizando el servicio de usuario)
            4. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            5. Hashear la contraseña antes de guardarla en la base de datos
            6. Guardar el usuario en la base de datos (utilizando el servicio de usuario)
            7. Devolver un mensaje de éxito si todo salió bien (status 201)
            8. Devolver un mensaje de error si algo falló guardando al usuario (status 500)
        
    */
};

/* const login = async (req, res) => { */

const login = async (req,res) => {
    const client = new Client(config);
    try {await client.connect();
    const {id, password} = req.body;


    let result = await client.query("select * from usuarios where email=$1, password=$2",[id]);
    console.log(result.rows[0]);
    const usuario_db = result.rows[0];
    const hashed = usuario_db.password;


    const match = await bcrypt.compare(password, hashed);
    await client.end();}

    catch (e) 
    {
        res.status(400).json({ error: 'error' });
        await client.end();
    }

    if(match) {
      const token = jwt.sign({id:usuario_db.id},jwtkey)
      res.send({ "email":usuario_db.email, "token":token})
      return;
    }
    res.send("Inexistente")


  // --------------- COMPLETAR ---------------
    /*

        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo email y password
            2. Buscar un usuario con el email recibido
            3. Verificar que el usuario exista
            4. Verificar que la contraseña recibida sea correcta
            5. Devolver un mensaje de error si algo falló hasta el momento (status 400)
            6. Crear un token con el id del usuario y firmarlo con la clave secreta (utilizando la librería jsonwebtoken)
            7. Devolver un json con el usuario y el token (status 200)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

export default { register, login };
