package projetosea.projeto_sea;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.Getter;
import lombok.Setter;

// DTO (Data Transfer Object) para receber a resposta da API ViaCEP

@Getter
@Setter
// Ignora campos que o ViaCEP mandar e que não queremos (ex: "ibge", "gia")
@JsonIgnoreProperties(ignoreUnknown = true)
public class EnderecoDTO {
    
    // Os nomes DEVEM ser iguais aos do JSON que o ViaCEP retorna
    private String logradouro;
    private String complemento;
    private String bairro;
    private String localidade; // O ViaCEP chama "cidade" de "localidade"
    private String uf;
    private String cep;
    
    // Precisamos "traduzir" o nome, pois o nosso é "cidade"
    public String getCidade() {
        return this.localidade;
    }

    // O Lombok vai gerar os getters e setters para os outros campos
}