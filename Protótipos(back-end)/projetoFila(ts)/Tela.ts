import SistemaFila from "./SistemaFila";

const sistemaFila = new SistemaFila();

// Adicionar funcionário
sistemaFila.adicionarFuncionario("João", "Gerente");

// Iniciar o sistema
sistemaFila.iniciar();

// Permitir que o funcionário visualize a fila e o cliente da vez após a inicialização
sistemaFila.getFuncionarios().forEach((funcionario) => {
    funcionario.visualizarFila(sistemaFila.getFilasEspera());
    funcionario.visualizarClienteDaVez(sistemaFila.getFilasEspera());
});
