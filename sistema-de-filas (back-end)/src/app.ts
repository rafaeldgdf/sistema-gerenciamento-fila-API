import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();

// Configuração do CORS
app.use(cors({
  origin: 'http://localhost:3001', // Substitua pelo endereço do seu front-end
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  credentials: true,
}));

app.use(express.json());
app.use(routes);

export default app;
