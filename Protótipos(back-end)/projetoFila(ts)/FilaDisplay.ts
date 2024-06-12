import Fila from "./Fila";
import Cliente from "./Cliente";

class FilaDisplay {
    exibirFilas(filasEspera: Map<number, Fila>): void {
        let mensagemFilas: string = "\nFilas de espera:";
        for (const fila of filasEspera.values()) {
            mensagemFilas += `\n\n           ${fila.getLugares()} lugares`;
            mensagemFilas += "\n|     NOME      |   SENHA   |";
            fila.getClientes().forEach((cliente: Cliente, index: number) => {
                mensagemFilas += `\n${index + 1}º  `;
                mensagemFilas += `${cliente.getNome().padEnd(10, " ")}   |   ${cliente.getSenha().toString().padStart(4, "0")}   |`;
            });
        }
        console.log(mensagemFilas);
    }
}

export default FilaDisplay;
