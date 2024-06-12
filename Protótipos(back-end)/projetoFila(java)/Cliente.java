package projetoMascate;

public class Cliente {
    private String nome;
    private int senha;

    public Cliente(String nome, int senha) {
        if (nome.length() > 10) {
            throw new IllegalArgumentException("O nome não pode ter mais que 10 caracteres.");
        }
        this.nome = nome;
        this.senha = senha;
    }

    public String getNome() {
        return nome;
    }

    public int getSenha() {
        return senha;
    }
}
