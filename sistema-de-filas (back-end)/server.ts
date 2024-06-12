import 'reflect-metadata';
import { createConnection } from 'typeorm';
import app from './src/app';
import { createServer } from 'http';
import { Server } from 'socket.io';
import { AppDataSource } from './src/data-source';

AppDataSource.initialize().then(() => {
  const server = createServer(app);
  const io = new Server(server);

  io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
      console.log('user disconnected');
    });
  });

  server.listen(3333, () => {
    console.log('Server started on port 3333!');
  });
}).catch(error => console.log(error));
