package projetoMascate;

import java.util.ArrayList;
import java.util.List;

public class Fila {
    private int lugares;
    private List<Cliente> clientes;

    public Fila(int lugares) {
        this.lugares = lugares;
        this.clientes = new ArrayList<>();
    }

    public void adicionarCliente(Cliente cliente) {
        clientes.add(cliente);
    }

    public List<Cliente> getClientes() {
        return clientes;
    }

    public int getLugares() {
        return lugares;
    }
}
