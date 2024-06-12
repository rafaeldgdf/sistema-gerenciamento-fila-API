import Cliente from "./Cliente";

class Fila {
    private lugares: number;
    private clientes: Cliente[];

    constructor(lugares: number) {
        this.lugares = lugares;
        this.clientes = [];
    }

    adicionarCliente(cliente: Cliente): void {
        this.clientes.push(cliente);
    }

    getClientes(): Cliente[] {
        return this.clientes;
    }

    getLugares(): number {
        return this.lugares;
    }
}

export default Fila;
