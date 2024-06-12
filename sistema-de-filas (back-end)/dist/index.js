"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const data_source_1 = require("./data-source");
const app_1 = __importDefault(require("./app"));
const http_1 = require("http");
const socket_io_1 = require("socket.io");
const cors_1 = __importDefault(require("cors"));
// Adicionar CORS ao aplicativo express
app_1.default.use((0, cors_1.default)({
    origin: 'http://localhost:3001', // Permitir acesso a partir do frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));
// Inicializar a conexão do DataSource do TypeORM
data_source_1.AppDataSource.initialize().then(() => {
    console.log('Data Source has been initialized!');
    // Criar o servidor HTTP usando o Express
    const server = (0, http_1.createServer)(app_1.default);
    // Configurar o Socket.io com CORS
    const io = new socket_io_1.Server(server, {
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
    app_1.default.set('io', io);
    // Iniciar o servidor na porta 3333
    server.listen(3333, () => {
        console.log('Server started on port 3333!');
    });
}).catch(error => {
    console.error('Error during Data Source initialization:', error);
});
