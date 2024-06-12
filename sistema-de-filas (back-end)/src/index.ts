import 'reflect-metadata';
import { AppDataSource } from './data-source';
import app from './app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import cors from 'cors';

// Adicionar CORS ao aplicativo express
app.use(cors({
  origin: 'http://localhost:3001', // Permitir acesso a partir do frontend
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

// Inicializar a conexão do DataSource do TypeORM
AppDataSource.initialize().then(() => {
  console.log('Data Source has been initialized!');

  // Criar o servidor HTTP usando o Express
  const server = createServer(app);

  // Configurar o Socket.io com CORS
  const io = new Server(server, {
    cors: {
      origin: 'http://localhost:3001', // Permitir acesso a partir do frontend
      methods: ['GET', 'POST']
    }
  });

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  // Tornar o io acessível globalmente para que o ClienteController possa utilizá-lo
  app.set('io', io);

  // Iniciar o servidor na porta 3333
  server.listen(3333, () => {
    console.log('Server started on port 3333!');
  });
}).catch(error => {
  console.error('Error during Data Source initialization:', error);
});
