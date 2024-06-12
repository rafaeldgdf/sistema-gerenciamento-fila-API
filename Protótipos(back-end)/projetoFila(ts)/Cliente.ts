class Cliente {
    private nome: string;
    private senha: number;

    constructor(nome: string, senha: number) {
        if (nome.length > 10) {
            throw new Error("O nome não pode ter mais que 10 caracteres.");
        }
        this.nome = nome;
        this.senha = senha;
    }

    getNome(): string {
        return this.nome;
    }

    getSenha(): number {
        return this.senha;
    }
}

export default Cliente;
