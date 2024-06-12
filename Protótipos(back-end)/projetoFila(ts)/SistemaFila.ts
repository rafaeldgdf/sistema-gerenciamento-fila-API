import Cliente from "./Cliente";
import ClienteInput from "./ClienteInput";
import Fila from "./Fila";
import Funcionario from "./Funcionario";
import FilaDisplay from ".FilaDisplay";
import * as readline from "readline";

class SistemaFila {
    private filasEspera: Map<number, Fila>;
    private senhasUtilizadas: Set<number>;
    private funcionarios: Funcionario[];
    private clienteInput: ClienteInput;
    private filaDisplay: FilaDisplay;

    constructor() {
        this.filasEspera = new Map<number, Fila>();
        this.senhasUtilizadas = new Set<number>();
        this.funcionarios = [];
        this.clienteInput = new ClienteInput();
        this.filaDisplay = new FilaDisplay();
    }

    gerarSenha(): number {
        let senha: number;
        do {
            senha = Math.floor(Math.random() * 10000);
        } while (this.senhasUtilizadas.has(senha));
        this.senhasUtilizadas.add(senha);
        return senha;
    }

    encerrarPrograma(senhaCorreta: string): boolean {
        const tentativasMaximas = 3;
        let tentativasRestantes = tentativasMaximas;
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const recursiveQuestion = () => {
            readline.question(`Digite a senha para encerrar o programa (Tentativas restantes: ${tentativasRestantes}): `, (senhaDigitada: string) => {
                if (senhaDigitada === senhaCorreta) {
                    console.log("Programa encerrado.");
                    readline.close();
                    return true;
                } else {
                    tentativasRestantes--;
                    console.log(`Senha incorreta. Tentativas restantes: ${tentativasRestantes}`);
                    if (tentativasRestantes > 0) {
                        recursiveQuestion();
                    } else {
                        console.log("Número de tentativas esgotado. Encerrando o programa.");
                        readline.close();
                        return false;
                    }
                }
            });
        };
        recursiveQuestion();
        return false;
    }

    adicionarCliente(nome: string, lugares: number): void {
        const fila = this.filasEspera.get(lugares) || new Fila(lugares);
        const senha = this.gerarSenha();
        try {
            const cliente = new Cliente(nome, senha);
            fila.adicionarCliente(cliente);
            this.filasEspera.set(lugares, fila);
        } catch (error) {
            console.log("Erro ao adicionar cliente.");
        }
    }

    exibirFilas(): void {
        this.filaDisplay.exibirFilas(this.filasEspera);
    }

    adicionarFuncionario(nome: string, cargo: string): void {
        const funcionario = new Funcionario(nome, cargo, FilaDisplay);
        this.funcionarios.push(funcionario);
    }

    iniciar(): void {
        const readline = require("readline").createInterface({
            input: process.stdin,
            output: process.stdout
        });

        const recursiveQuestion = () => {
            readline.question("Cliente: ", (nome: string) => {
                if (nome.toLowerCase() === "sair") {
                    if (this.encerrarPrograma("senha123")) {
                        readline.close();
                    } else {
                        recursiveQuestion();
                    }
                } else {
                    const clienteData = this.clienteInput.receberDadosCliente();
                    this.adicionarCliente(clienteData.nome, clienteData.lugares);
                    this.exibirFilas();
                    recursiveQuestion();
                }
            });
        };
        recursiveQuestion();
    }
}

export default SistemaFila;
