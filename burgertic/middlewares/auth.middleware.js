import jwt from "jsonwebtoken";
import UsuariosService from "../services/usuarios.service.js";

export const verifyToken = async (req, res, next) => {
        try {
        // 1. Verificar si hay un token en los headers de autorización
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: 'No autorizado. Token faltante o malformado' });
        }

        // 2. Extraer el token del header
        const token = authHeader.split(' ')[1];

        // 3. Verificar que el token sea válido
        const decoded = jwt.verify(token, "clavesupersegurajwt");

        // 4. Verificar que tenga un id de usuario al decodificarlo
        if (!decoded || !decoded.id) {
            return res.status(401).json({ error: 'No autorizado. Token inválido' });
        }

        // Guardar el id del usuario en la request para usarlo en los próximos middlewares o controladores
        req.userId = decoded.id;

        next(); // Continuar con la ejecución si el token es válido
    } catch (error) {
        return res.status(401).json({ error: 'No autorizado. Token inválido o expirado' });
    }
};


export const verifyAdmin = async (req, res, next) => {

        try {
            // 1. Verificar que el id de usuario en la request es un administrador
            const usuario = await UsuariosService.getById(req.userId);
    
            if (!usuario || !usuario.isAdmin) {
                return res.status(403).json({ error: 'Acceso denegado. No eres administrador' });
            }
    
            next(); // Continuar si el usuario es administrador
        } catch (error) {
            return res.status(500).json({ error: 'Error interno del servidor' });
        }
    };
