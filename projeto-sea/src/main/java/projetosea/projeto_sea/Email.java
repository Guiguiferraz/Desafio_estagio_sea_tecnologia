// 1. Pacote correto
package projetosea.projeto_sea;

// 2. Importações do Lombok
import lombok.Getter;
import lombok.Setter;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;

// 3. Importações do Jakarta Persistence (Hibernate/JPA)
import jakarta.persistence.Entity;
import jakarta.persistence.Table;
import jakarta.persistence.Id;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import com.fasterxml.jackson.annotation.JsonBackReference;


// 4. Anotações do Lombok
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

// 5. Anotações do JPA
@Entity
@Table(name = "emails") // Nome da tabela no MySQL
public class Email {
    
    // 6. Chave Primária (ID)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID único no banco

    private String email;
    
    // 7. Relacionamento: Muitos emails pertencem a UM Cliente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id") // A coluna que fará a ligação
    @JsonBackReference // Evita loop infinito
    private Cliente cliente;

    // Construtor que usávamos
    public Email(String email) {
        this.email = email;
    }
}