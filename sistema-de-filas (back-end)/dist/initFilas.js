"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const Fila_1 = __importDefault(require("./entities/Fila"));
async function initFilas() {
    const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
    const filasExistentes = await filaRepository.find();
    if (filasExistentes.length === 0) {
        const filas = Array.from({ length: 10 }, (_, i) => {
            const fila = new Fila_1.default();
            fila.nome = `Fila ${i + 1}`;
            fila.capacidade = i + 1;
            fila.priority = i + 1;
            fila.clientes = [];
            return fila;
        });
        await filaRepository.save(filas);
        console.log('Filas criadas com sucesso');
    }
    else {
        console.log('Filas já existem');
    }
}
data_source_1.AppDataSource.initialize()
    .then(() => {
    console.log('Data Source has been initialized!');
    initFilas();
})
    .catch((error) => console.error('Error during Data Source initialization:', error));
