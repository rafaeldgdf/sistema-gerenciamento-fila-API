"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const data_source_1 = require("./data-source");
const Fila_1 = __importDefault(require("./entities/Fila"));
const insertFilas = async () => {
    await data_source_1.AppDataSource.initialize();
    const filaRepository = data_source_1.AppDataSource.getRepository(Fila_1.default);
    for (let i = 1; i <= 10; i++) {
        const fila = filaRepository.create({
            nome: `Fila ${i}`,
            capacidade: i,
            priority: i
        });
        await filaRepository.save(fila);
    }
    console.log('Filas inseridas com sucesso');
};
insertFilas().catch((error) => console.log(error));
