package projetosea.projeto_sea;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.Optional; // <-- Importante adicionar este

@Repository
public interface ClienteRepository extends JpaRepository<Cliente, Long> {
    

    // Spring Data JPA vai criar o SQL automaticamente:
    // "SELECT * FROM clientes WHERE cpf = ?"
    Optional<Cliente> findByCpf(String cpf);
}