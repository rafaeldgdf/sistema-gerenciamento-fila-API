package projetoMascate;

import java.util.Map;

public class Funcionario {
    private String nome;
    private String cargo;
    private FilaDisplay filaDisplay;
    
    public Funcionario() {}; 

    public Funcionario(String nome, String cargo, FilaDisplay filaDisplay) {
        this.nome = nome;
        this.cargo = cargo;
        this.filaDisplay = filaDisplay;
    }

    public String getNome() {
        return nome;
    }

    public String getCargo() {
        return cargo;
    }

    public void visualizarFila(Map<Integer, Fila> filasEspera) {
        filaDisplay.exibirFilas(filasEspera);
    }

    public void visualizarClienteDaVez(Map<Integer, Fila> filasEspera) {
        for (Map.Entry<Integer, Fila> entry : filasEspera.entrySet()) {
            Fila fila = entry.getValue();
            if (!fila.getClientes().isEmpty()) {
                Cliente cliente = fila.getClientes().get(0);
                System.out.println("Cliente da vez para fila de " + fila.getLugares() + " lugares:");
                System.out.println("Nome: " + cliente.getNome() + ", Senha: " + String.format("%04d", cliente.getSenha()));
                return;
            }
        }
        System.out.println("Não há clientes na fila.");
    }
}
