"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const Cliente_1 = __importDefault(require("./Cliente"));
const Fila_1 = __importDefault(require("./Fila"));
const Funcionario_1 = __importDefault(require("./Funcionario"));
let Atendimento = class Atendimento {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Atendimento.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Cliente_1.default, cliente => cliente.atendimentos),
    __metadata("design:type", Cliente_1.default)
], Atendimento.prototype, "cliente", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Fila_1.default, fila => fila.atendimentos),
    __metadata("design:type", Fila_1.default)
], Atendimento.prototype, "fila", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Funcionario_1.default, funcionario => funcionario.atendimentos),
    __metadata("design:type", Funcionario_1.default)
], Atendimento.prototype, "funcionario", void 0);
Atendimento = __decorate([
    (0, typeorm_1.Entity)('atendimentos')
], Atendimento);
exports.default = Atendimento;
