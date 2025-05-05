const express = require('express');
const swaggerView = require('./swagger');
const app = express();
const port = 3000;

/**
 * @swagger
 * /:
 *   get:
 *     description: Get the server status
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The server status
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: string
 *                   description: The server status
 */
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.use("/api", swaggerView);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
