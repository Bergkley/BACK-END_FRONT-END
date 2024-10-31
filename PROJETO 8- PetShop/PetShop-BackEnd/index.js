const express = require('express');
const cors = require('cors');
const mongoose = require('./db/conn');

const app = express();

// config json
app.use(express.json());


// Salve cors
app.use(cors());

// Routes
const UserRoutes = require('./routes/UserRouter');
const PetRoutes = require('./routes/PetRouter');

app.use('/users', UserRoutes);
app.use('/pets', PetRoutes);
app.use('/', (req, res) => {
    res.send('Hello World!');
})

// Conexão
app.listen(5000)
