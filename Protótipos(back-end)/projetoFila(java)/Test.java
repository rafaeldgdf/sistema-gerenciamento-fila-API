package projetoMascate;

public class Test {
    public static void main(String[] args) {
        SistemaFila sistemaFila = new SistemaFila();
        FilaDisplay fp = new FilaDisplay();
        
        // Adicionar funcionário
        Funcionario funcionario1 = new Funcionario("João", "Atendente", fp);

        // Iniciar o sistema
        sistemaFila.iniciar();

        // Permitir que o funcionário visualize a fila e o cliente da vez após a inicialização
        for (Funcionario funcionario : sistemaFila.getFuncionarios()) {
            funcionario.visualizarFila(sistemaFila.getFilasEspera());
            funcionario.visualizarClienteDaVez(sistemaFila.getFilasEspera());
        }
        
        
   
    }
}
