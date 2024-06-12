import Fila from "./Fila";
import FilaDisplay from "./FilaDisplay";

class Funcionario {
    private nome: string;
    private cargo: string;
    private filaDisplay: FilaDisplay;

    constructor(nome: string, cargo: string, filaDisplay: FilaDisplay) {
        this.nome = nome;
        this.cargo = cargo;
        this.filaDisplay = filaDisplay;
    }

    getNome(): string {
        return this.nome;
    }

    getCargo(): string {
        return this.cargo;
    }

    visualizarFila(filasEspera: Map<number, Fila>): void {
        this.filaDisplay.exibirFilas(filasEspera);
    }

    visualizarClienteDaVez(filasEspera: Map<number, Fila>): void {
        for (const [_, fila] of filasEspera) {
            const clientes = fila.getClientes();
            if (clientes.length > 0) {
                const cliente = clientes[0];
                console.log(`Cliente da vez para fila de ${fila.getLugares()} lugares:`);
                console.log(`Nome: ${cliente.getNome()}, Senha: ${cliente.getSenha().toString().padStart(4, '0')}`);
                return;
            }
        }
        console.log("Não há clientes na fila.");
    }
}

export default Funcionario;
