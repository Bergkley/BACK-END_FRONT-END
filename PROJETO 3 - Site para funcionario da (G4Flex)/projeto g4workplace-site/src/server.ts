import express, { Request, Response, ErrorRequestHandler } from 'express';
import path from 'path';
import dotenv from 'dotenv';
import cors from 'cors';
import apiRoutes from './routes/api';
import { createConnection, Connection } from 'typeorm'; // Importe createConnection do TypeORM
import mustache from "mustache-express";
import cookieParser from 'cookie-parser';

dotenv.config();

const server = express();

server.use(cors());

server.use(express.static(path.join(__dirname, '../public')));
server.use(express.urlencoded({ extended: true }));
server.set("view engine","mustache");
server.set("views", path.join(__dirname,'views'));
server.engine("mustache",mustache());

server.get('/ping', (req: Request, res: Response) => res.json({ pong: true }));

server.use(apiRoutes);
server.use(cookieParser()); 

server.use((req: Request, res: Response) => {
    res.status(404);
    res.json({ error: 'Endpoint não encontrado.' });
});

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
    res.status(400); // Bad Request
    console.error(err); // Alterei para console.error para melhor registro de erros
    res.json({ error: 'Ocorreu algum erro.' });
}
server.use(errorHandler);

async function initDatabase(): Promise<Connection> {
  try {
    const connection = await createConnection(); // Inicialize a conexão com o banco de dados
    console.log('Conexão com o banco de dados estabelecida com sucesso.');
    return connection;
  } catch (error) {
    console.error('Erro ao inicializar a conexão com o banco de dados:', error);
    throw error;
  }
}

async function startServer() {
  try {
    await initDatabase(); // Inicialize a conexão com o banco de dados

    server.listen(process.env.PORT, () => {
      console.log(`Servidor rodando na porta ${process.env.PORT}`);
    });
  } catch (error) {
    console.error('Erro ao iniciar o servidor:', error);
  }
}

startServer();
