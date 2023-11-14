import express, {Request,Response} from "express";
import dotenv from "dotenv";
import mustache from "mustache-express";
import path from "path";
import mainrouter from "../src/routes/index";

dotenv.config()

const server = express();

server.set("view engine","mustache");
server.set("views", path.join(__dirname,'views'));
server.engine("mustache",mustache());

server.use(express.static(path.join(__dirname,'../public')))

//rotas

server.use(mainrouter);

server.use((req:Request, res:Response)=>{
    res.status(404).render('pages/404')
})

server.listen(80)