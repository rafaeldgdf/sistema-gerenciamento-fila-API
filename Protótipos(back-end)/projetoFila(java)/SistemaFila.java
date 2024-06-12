package projetoMascate;

import java.util.*;

public class SistemaFila {
    private Map<Integer, Fila> filasEspera;
    private Set<Integer> senhasUtilizadas;
    private List<Funcionario> funcionarios;
    private ClienteInput clienteInput;
    private FilaDisplay filaDisplay;

    public SistemaFila() {
        filasEspera = new HashMap<>();
        senhasUtilizadas = new HashSet<>();
        funcionarios = new ArrayList<>();
        clienteInput = new ClienteInput();
        filaDisplay = new FilaDisplay();
    }

    public Map<Integer, Fila> getFilasEspera() {
		return filasEspera;
	}

	public void setFilasEspera(Map<Integer, Fila> filasEspera) {
		this.filasEspera = filasEspera;
	}

	public Set<Integer> getSenhasUtilizadas() {
		return senhasUtilizadas;
	}

	public void setSenhasUtilizadas(Set<Integer> senhasUtilizadas) {
		this.senhasUtilizadas = senhasUtilizadas;
	}

	public List<Funcionario> getFuncionarios() {
		return funcionarios;
	}

	public void setFuncionarios(List<Funcionario> funcionarios) {
		this.funcionarios = funcionarios;
	}

	public ClienteInput getClienteInput() {
		return clienteInput;
	}

	public void setClienteInput(ClienteInput clienteInput) {
		this.clienteInput = clienteInput;
	}

	public FilaDisplay getFilaDisplay() {
		return filaDisplay;
	}

	public void setFilaDisplay(FilaDisplay filaDisplay) {
		this.filaDisplay = filaDisplay;
	}

	public int gerarSenha() {
        Random rand = new Random();
        int senha;
        do {
            senha = rand.nextInt(10000); // Gerando um número aleatório de até 4 dígitos
        } while (senhasUtilizadas.contains(senha));
        senhasUtilizadas.add(senha);
        return senha;
    }

    public boolean encerrarPrograma(String senhaCorreta) {
        Scanner scanner = new Scanner(System.in);
        int tentativasRestantes = 3;
        while (tentativasRestantes > 0) {
            System.out.print("Digite a senha para encerrar o programa (Tentativas restantes: " + tentativasRestantes + "): ");
            String senhaDigitada = scanner.nextLine();
            if (senhaDigitada.equals(senhaCorreta)) {
                System.out.println("Programa encerrado.");
                return true;
            } else {
                tentativasRestantes--;
                System.out.println("Senha incorreta. Tentativas restantes: " + tentativasRestantes);
            }
        }
        return false;
    }

    public void adicionarCliente(String nome, int lugares) {
        Fila fila = filasEspera.getOrDefault(lugares, new Fila(lugares));
        int senha = gerarSenha();
        try {
            Cliente cliente = new Cliente(nome, senha);
            fila.adicionarCliente(cliente);
            filasEspera.put(lugares, fila);
        } catch (IllegalArgumentException e) {
            System.out.println(e.getMessage());
        }
    }

    public void exibirFilas() {
        filaDisplay.exibirFilas(filasEspera);
    }

    public void adicionarFuncionario(String nome, String cargo) {
        Funcionario funcionario = new Funcionario(nome, cargo, filaDisplay);
        funcionarios.add(funcionario);
    }


    public final static void clearConsole()
    {
        try
        {
            final String os = System.getProperty("os.name");

            if (os.contains("Windows"))
            {
                Runtime.getRuntime().exec("cls");
            }
            else
            {
                Runtime.getRuntime().exec("clear");
            }
        }
        catch (final Exception e)
        {
        	System.out.println("Erro ao tentar limpar o console: " + e.getMessage());
        }
    }
    
    public void iniciar() {
        while (true) {
            ClienteInput.ClienteData clienteData = clienteInput.receberDadosCliente();
            if (clienteData.getNome().equalsIgnoreCase("sair")) {
                if (encerrarPrograma("senha123")) {
                    break;
                } else {
                    continue;
                }
            }
            adicionarCliente(clienteData.getNome(), clienteData.getLugares());
            exibirFilas();
        }
    }
}
