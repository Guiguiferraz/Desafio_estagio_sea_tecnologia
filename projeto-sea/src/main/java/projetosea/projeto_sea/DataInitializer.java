package projetosea.projeto_sea;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.stereotype.Component;

// @Component diz ao Spring para "gerenciar" esta classe
@Component
// CommandLineRunner faz com que o método "run" rode
// assim que a aplicação iniciar
public class DataInitializer implements CommandLineRunner {

    // 1. Pede ao Spring o "repositório" do cliente
    @Autowired
    private ClienteRepository clienteRepository;

    @Override
    public void run(String... args) throws Exception {
        
        System.out.println(">>> Iniciando o DataInitializer (Plano B)...");

        // --- CRIA O USUÁRIO ADMIN ---
        // 1. Verifica se o Admin (pelo CPF '000.000.000-00') já não existe
        if (clienteRepository.findByCpf("00000000000").isEmpty()) {
            
            Cliente admin = new Cliente();
            admin.setNome("Administrador");
            admin.setCpf("00000000000"); // CPF fictício para o admin
            admin.setSenha("123qwe!@#"); // Senha em texto puro (Plano B)
            admin.setRole("ADMIN"); // O "role" de Admin
            
            // Adiciona um e-mail fictício (para não dar erro)
            admin.adicionarEmail(new Email("admin@app.com"));
            
            clienteRepository.save(admin);
            System.out.println(">>> Usuário ADMIN  criado com sucesso!");
        } else {
            System.out.println(">>> Usuário ADMIN  já existe.");
        }
    }
} 