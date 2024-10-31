const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

async function main() {
    try {
        await mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@petshop.usvym.mongodb.net/?retryWrites=true&w=majority&appName=petshop`);
        console.log('MongoDB conectado com sucesso!');
    } catch (error) {
        console.log(error);
    }
}

main().catch((err) => console.log(err));

module.exports = mongoose;
