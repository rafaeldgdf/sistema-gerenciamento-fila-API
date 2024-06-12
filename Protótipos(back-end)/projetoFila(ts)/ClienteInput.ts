import Cliente from "./Cliente";

class ClienteInput {
    receberDadosCliente(): { nome: string, lugares: number } {
        const nome = prompt("Cliente:") || "";
        if (nome.length > 10) {
            throw new Error("O nome não pode ter mais que 10 caracteres.");
        }

        let lugares = 0;
        while (true) {
            const lugaresStr = prompt("Digite a quantidade de lugares desejada (entre 1 e 10):") || "";
            try {
                lugares = parseInt(lugaresStr);
                if (1 <= lugares && lugares <= 10) {
                    break;
                } else {
                    console.log("Por favor, digite um número de lugares válido (entre 1 e 10).");
                }
            } catch (error) {
                console.log("Por favor, digite um número válido.");
            }
        }
        return { nome, lugares };
    }
}

export default ClienteInput;
