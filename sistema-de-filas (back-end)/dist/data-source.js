"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const Cliente_1 = __importDefault(require("./entities/Cliente"));
const Funcionario_1 = __importDefault(require("./entities/Funcionario"));
const Fila_1 = __importDefault(require("./entities/Fila"));
const Atendimento_1 = __importDefault(require("./entities/Atendimento"));
const Saida_1 = __importDefault(require("./entities/Saida"));
exports.AppDataSource = new typeorm_1.DataSource({
    type: 'mysql',
    host: 'localhost',
    port: 3306,
    username: 'root',
    password: 'root',
    database: 'sistemafila_novo',
    synchronize: true,
    dropSchema: true, // Adicione esta linha para descartar e recriar o esquema automaticamente
    logging: false,
    entities: [Cliente_1.default, Funcionario_1.default, Fila_1.default, Atendimento_1.default, Saida_1.default],
    migrations: [],
    subscribers: [],
});
