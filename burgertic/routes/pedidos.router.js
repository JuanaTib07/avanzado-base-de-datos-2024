import Router from "express";
import PedidosController from "../controllers/pedidos.controller.js";
import { verifyAdmin, verifyToken } from "../middlewares/auth.middleware.js";

const router = Router();

router.get("/", PedidosController.getPedidos);
router.get("/:id", PedidosController.getPedidoById);
router.get("/tipo/:tipo", PedidosController.getPedidosByUser);
router.post("/", verifyToken, PedidosController.createPedido);
router.put("/:id", verifyToken, verifyAdmin, PedidosController.aceptarPedido);
router.delete("/:id", verifyToken, verifyAdmin, PedidosController.deletePedido);


// ------------- COMPLETAR LAS RUTAS DE PEDIDOS -------------
// IMPORTANTE: La ruta /usuario debe ir antes que la ruta /:id
// Si no, Express interpretará "usuario" como un id y no funcionará correctamente

// Recordar utilizar los middleware verifyToken y/o verifyAdmin en las rutas que correspondan

export default router;
