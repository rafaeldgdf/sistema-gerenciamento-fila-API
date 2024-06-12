package projetoMascate;

import java.util.List;
import java.util.Map;

public class FilaDisplay {

    public void exibirFilas(Map<Integer, Fila> filasEspera) {
        StringBuilder mensagemFilas = new StringBuilder("\nFilas de espera:");
        for (Fila fila : filasEspera.values()) {
            mensagemFilas.append("\n\n           ").append(fila.getLugares()).append(" lugares");
            mensagemFilas.append("\n|     NOME      |   SENHA   |");
            List<Cliente> clientes = fila.getClientes();
            for (int i = 0; i < clientes.size(); i++) {
                Cliente cliente = clientes.get(i);
                mensagemFilas.append("\n").append(i + 1).append("º  ");
                mensagemFilas.append(String.format("%-10s", cliente.getNome())); // Nome formatado como string
                mensagemFilas.append("   |   ");
                mensagemFilas.append(String.format("%04d", cliente.getSenha())); // Senha formatada como inteiro
                mensagemFilas.append("   |");
            }
        }
        System.out.println(mensagemFilas);
    }
}
