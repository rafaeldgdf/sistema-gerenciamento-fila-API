"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteRepository = void 0;
const Cliente_1 = __importDefault(require("../entities/Cliente"));
const ClienteRepository = (dataSource) => dataSource.getRepository(Cliente_1.default);
exports.ClienteRepository = ClienteRepository;
