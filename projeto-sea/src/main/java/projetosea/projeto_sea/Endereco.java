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
import jakarta.persistence.OneToOne;
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
@Table(name = "enderecos") // Nome da tabela no MySQL
public class Endereco {
    
    // 6. Chave Primária (ID)
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // ID único no banco

    private String cep;
    private String logradouro;
    private String numero;
    private String complemento;
    private String bairro;
    private String cidade;
    private String uf; // Estado (Unidade Federativa)
    
    // 7. Relacionamento: Um Endereço pertence a UM Cliente
    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "cliente_id") // A coluna que fará a ligação
    @JsonBackReference // Evita loop infinito
    private Cliente cliente;

    // Construtor que usávamos (agora sem o 'id' e 'cliente')
    public Endereco(String cep, String logradouro, String numero, String complemento, String bairro, String cidade, String uf) {
        this.cep = cep;
        this.logradouro = logradouro;
        this.numero = numero;
        this.complemento = complemento;
        this.bairro = bairro;
        this.cidade = cidade;
        this.uf = uf;
    }
}