const express = require('express');
const swaggerView = require('./swagger');
const doctorsRouter = require('./src/routes/doctors');
const municipalitiesRouter = require('./src/routes/municipalities');
const app = express();
const port = 3000;
const cors = require('cors');

app.use(cors({
    origin: 'http://localhost:5173', // Remplacez par l'URL de votre frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use('/api/doctors', doctorsRouter);
app.use('/api/municipalities', municipalitiesRouter);

app.use("/api", swaggerView);

app.listen(port, () => {
    console.log(`Serveur démarré sur http://localhost:${port}`);
});
