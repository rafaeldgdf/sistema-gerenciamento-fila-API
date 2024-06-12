package projetoMascate;

import java.util.Scanner;

public class ClienteInput {
    public static class ClienteData {
        private String nome;
        private int lugares;

        public ClienteData(String nome, int lugares) {
            this.nome = nome;
            this.lugares = lugares;
        }

        public String getNome() {
            return nome;
        }

        public int getLugares() {
            return lugares;
        }
    }

    public ClienteData receberDadosCliente() {
        Scanner scanner = new Scanner(System.in);

        System.out.print("Cliente: ");
        String nome = scanner.nextLine();
        if (nome.length() > 10) {
            throw new IllegalArgumentException("O nome não pode ter mais que 10 caracteres.");
        }

        int lugares = 0;
        while (true) {
            System.out.print("Digite a quantidade de lugares desejada (entre 1 e 10): ");
            String lugaresStr = scanner.nextLine();
            try {
                lugares = Integer.parseInt(lugaresStr);
                if (1 <= lugares && 10 >= lugares) {
                    break;
                } else {
                    System.out.println("Por favor, digite um número de lugares válido (entre 1 e 10).");
                }
            } catch (NumberFormatException e) {
                System.out.println("Por favor, digite um número válido.");
            }
        }
        return new ClienteData(nome, lugares);
    }
}
