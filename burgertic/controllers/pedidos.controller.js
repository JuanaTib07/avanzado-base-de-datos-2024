import pedidosService from "../services/pedidos.service.js";
import PedidosService from "../services/pedidos.service.js";
const { Client } = pkg;
const client = new Client(config);
await client.connect();

const getPedidos = async (req, res) => {

    const client = new Client(config);
    try {
        const [pedidos] = await client.query(
            `SELECT * FROM "perdido" `
        );
        res.status(200).json(pedidos);
    }
    catch (e) {
        res.status(500).json({ error: 'No se puede mostrar el pedido' });
        await client.end();
    }
/*
            1. Utilizar el servicio de pedidos para obtener todos los pedidos
            2. Devolver un json con los pedidos (status 200)
            3. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const getPedidosByUser = async (req, res) => {
    pedidosService.getPedidosByUser
};

const getPedidoById = async (req, res) => {
    const client = new Client(config);
    try {
        const {rows} = await client.query(
            `SELECT * FROM "pedidos" WHERE "id" = $1`
        );
        res.status(200).json(pedidos);
    }
    catch (e) {
        res.status(500).json({ error: 'No sepuede mostrar el pedido' });
        await client.end();
    }
    
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, devolver un json con el pedido (status 200)
            4. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const createPedido = async (req, res) => {
    const client = new Client(config);
    await client.connect();

    try {
        // ACÁ SE PODRÍA HACER EN ETAPAS
        // 1. Validar que los platos existan
        // 2. Crear el pedido
        // 3. Agregar los platos al pedido

        // Así, no hace falta introducir el concepto de transacciones o rollback

        const { rows } = await client.query(
            "INSERT INTO pedidos (id_usuario, fecha, estado) VALUES ($1, $2, 'pendiente') RETURNING id",
            [idUsuario, new Date()]
        );

        const idPedido = rows[0].id;

        for (let plato of platos) {
            const { rows } = await client.query(
                "SELECT * FROM platos WHERE id = $1",
                [plato.id]
            );

            if (rows.length < 1) {
                await client.query("DELETE FROM pedidos WHERE id = $1", [
                    idPedido,
                ]);
                await client.query(
                    "DELETE FROM pedidos_platos WHERE id_pedido = $1",
                    [idPedido]
                );
                throw new Error("Plato no encontrado");
            }

            await client.query(
                "INSERT INTO pedidos_platos (id_pedido, id_plato, cantidad) VALUES ($1, $2, $3)",
                [idPedido, plato.id, plato.cantidad]
            );
        }

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }

    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Verificar que el body de la request tenga el campo platos
            2. Verificar que el campo productos sea un array
            3. Verificar que el array de productos tenga al menos un producto
            4. Verificar que todos los productos tengan un id y una cantidad
            5. Si algo de lo anterior no se cumple, devolver un mensaje de error (status 400)
            6. Crear un pedido con los productos recibidos y el id del usuario (utilizando el servicio de pedidos)
            7. Devolver un mensaje de éxito (status 201)
            8. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

const aceptarPedido = async (req, res) => {

    const aceptarPedido = async (req, res) => {
        const client = new Client(config);
        await client.connect();
    
        try {
            const pedidoId = req.params.id;
            const pedido = await PedidosService.getById(pedidoId);
            if (!pedido) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }
            if (pedido.estado !== 'pendiente') {
                return res.status(400).json({ error: 'El pedido no está en estado pendiente' });
            }
            await PedidosService.updateEstado(pedidoId, 'aceptado');
            res.status(200).json({ message: 'Pedido aceptado' });
        } catch (error) {
            res.status(500).json({ error: 'Error al aceptar el pedido' });
        } finally {
            await client.end();
        }
    };

    
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, verificar que el pedido esté en estado "pendiente"
            4. Si el pedido no está en estado "pendiente", devolver un mensaje de error (status 400)
            5. Si el pedido está en estado "pendiente", actualizar el estado del pedido a "aceptado"
            6. Devolver un mensaje de éxito (status 200)
            7. Devolver un mensaje de error si algo falló (status 500)
        
    */
};


const updatePedido = async (id, estado) => {
    if (
        estado !== "aceptado" &&
        estado !== "en camino" &&
        estado !== "entregado"
    )
        throw new Error("Estado inválido");

    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "UPDATE pedidos SET estado = $1 WHERE id = $2",
            [estado, id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
};

const deletePedido = async (req, res) => {

    const client = new Client(config);
    await client.connect();

    try {
        const { rows } = await client.query(
            "DELETE FROM pedidos WHERE id = $1",
            [id]
        );

        await client.end();
        return rows;
    } catch (error) {
        await client.end();
        throw error;
    }
    
    // --------------- COMPLETAR ---------------
    /*
        Recordar que para cumplir con toda la funcionalidad deben:

            1. Utilizar el servicio de pedidos para obtener el pedido por id (utilizando el id recibido en los parámetros de la request)
            2. Si el pedido no existe, devolver un mensaje de error (status 404)
            3. Si el pedido existe, eliminar el pedido
            4. Devolver un mensaje de éxito (status 200)
            5. Devolver un mensaje de error si algo falló (status 500)
        
    */
};

export default {
    getPedidos,
    getPedidosByUser,
    getPedidoById,
    createPedido,
    aceptarPedido,
    updatePedido,
    entregarPedido,
    deletePedido,
};
