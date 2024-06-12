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
const Atendimento_1 = __importDefault(require("./Atendimento"));
let Fila = class Fila {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    __metadata("design:type", String)
], Fila.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], Fila.prototype, "nome", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fila.prototype, "capacidade", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], Fila.prototype, "priority", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Cliente_1.default, cliente => cliente.fila, { cascade: true }),
    __metadata("design:type", Array)
], Fila.prototype, "clientes", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Atendimento_1.default, atendimento => atendimento.fila, { cascade: true }),
    __metadata("design:type", Array)
], Fila.prototype, "atendimentos", void 0);
Fila = __decorate([
    (0, typeorm_1.Entity)('filas')
], Fila);
exports.default = Fila;
