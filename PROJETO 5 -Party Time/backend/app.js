const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());

app.use(express.json());

// DB connection

const conn = require('./db/conn');

// Routes

const routes = require('./routes/router');
app.use("/api", routes);

conn();

app.listen(3000, function(){
    console.log("Servidor online")
})