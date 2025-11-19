// 1. Pacote correto (onde o arquivo está)
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


// 4. Anotações do Lombok: criam getters, setters e construtores
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor

// 5. Anotações do JPA: diz que esta classe é uma tabela no banco
@Entity
@Table(name = "telefones") // Nome da tabela no MySQL
public class Telefone {
    
    // 6. Chave Primária (ID)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // Todo registro no banco precisa de um ID

    private String tipo; 
    private String numero;
    
    // 7. Relacionamento: Muitos telefones pertencem a UM Cliente
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id") // A coluna que fará a ligação
    @JsonBackReference // Evita loop infinito ao converter para JSON
    private Cliente cliente;

    // Construtor que usávamos (agora sem o 'id' e 'cliente')
    // O Lombok já criou um construtor com todos os campos
    // Mas podemos manter um para facilitar, se quisermos
    public Telefone(String tipo, String numero) {
        this.tipo = tipo;
        this.numero = numero;
    }
}