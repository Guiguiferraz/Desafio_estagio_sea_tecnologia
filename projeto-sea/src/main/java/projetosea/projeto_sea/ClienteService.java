package projetosea.projeto_sea;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.client.RestTemplate;
import java.util.List;
import java.util.Optional; // Import para checagem de Optional

@Service
public class ClienteService {

    @Autowired
    private ClienteRepository clienteRepository;
    
    private final RestTemplate restTemplate = new RestTemplate();

    @Transactional
    public Cliente criarCliente(Cliente cliente) {
        
        // =========================================================
        // LIMPEZA E VALIDAÇÃO DE DADOS (CRUCIAL)
        // =========================================================
        
        // 1. Limpa o CPF e o CEP de qualquer caractere de máscara (se o Front-end esquecer)
        String cpfLimpo = cliente.getCpf().replaceAll("[^\\d]", "");
        cliente.setCpf(cpfLimpo); // Atualiza o objeto com o valor limpo

        String cepLimpo = cliente.getEndereco().getCep().replaceAll("[^\\d]", "");
        cliente.getEndereco().setCep(cepLimpo);

        // 2. REGRA: Validação de CPF único
        if (clienteRepository.findByCpf(cpfLimpo).isPresent()) {
             throw new RuntimeException("ERRO: O CPF " + cliente.getCpf() + " já está cadastrado!");
        }

        // =========================================================
        // REGRA: Integração com API de CEP (ViaCEP)
        // =========================================================
        String viaCepUrl = "https://viacep.com.br/ws/" + cepLimpo + "/json/";

        try {
            EnderecoDTO enderecoDTO = restTemplate.getForObject(viaCepUrl, EnderecoDTO.class);

            // Preenchimento do Endereço (usando os dados da API)
            Endereco endereco = cliente.getEndereco();
            endereco.setLogradouro(enderecoDTO.getLogradouro());
            endereco.setBairro(enderecoDTO.getBairro());
            endereco.setCidade(enderecoDTO.getCidade());
            endereco.setUf(enderecoDTO.getUf());
            
            // Se o complemento não veio do front, usamos o da API (se existir)
            if (endereco.getComplemento() == null || endereco.getComplemento().isEmpty()) {
                endereco.setComplemento(enderecoDTO.getComplemento());
            }
            
            cliente.setEndereco(endereco);

        } catch (Exception e) {
            throw new RuntimeException("CEP inválido ou não encontrado: " + cliente.getEndereco().getCep());
        }

        // 4. Define o ROLE como USER para todo cadastro via formulário
        if (cliente.getRole() == null || cliente.getRole().isEmpty()) {
            cliente.setRole("USER");
        }
        
        // 5. Salvar no Banco
        return clienteRepository.save(cliente);
    }
    
    // ==========================================================
    // MÉTODO NOVO PARA "SELECT ALL" (PARA A TELA ADMIN)
    // ==========================================================
    public List<Cliente> listarClientes() {
        // Simplesmente chama o método "findAll" que o JpaRepository nos dá
        return clienteRepository.findAll();
    }
}