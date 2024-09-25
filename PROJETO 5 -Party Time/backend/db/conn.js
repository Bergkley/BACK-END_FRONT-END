const mongoose = require("mongoose");

async function main(){
    try{
        mongoose.set('strictQuery', true)
        await mongoose.connect("mongodb+srv://bergkley:i75STvAgxkflYeoz@cluster0.wgrog.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")

        console.log('MongoDB conectado com sucesso!');
    }catch(error){
        console.log(error)
    }
}

module.exports = main;