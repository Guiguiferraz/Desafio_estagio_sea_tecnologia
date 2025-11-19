package projetosea.projeto_sea;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import java.util.Optional;

// --- DTO (Classes) para o Login ---
class LoginRequest {
    private String cpf;
    private String senha;
    
    public String getCpf() { return cpf; }
    public void setCpf(String cpf) { this.cpf = cpf; }
    public String getSenha() { return senha; }
    public void setSenha(String senha) { this.senha = senha; }
}

class LoginResponse {
    private String message;
    private String role; 

    public LoginResponse(String message, String role) {
        this.message = message;
        this.role = role;
    }

    public String getMessage() { return message; }
    public String getRole() { return role; }
}


// --- O CONTROLLER DE LOGIN ---

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173") 
public class LoginController {

    @Autowired
    private ClienteRepository clienteRepository;

    @PostMapping("/login")
    public ResponseEntity<LoginResponse> login(@RequestBody LoginRequest loginRequest) {
        
        String cpfLimpo = loginRequest.getCpf().replaceAll("[^\\d]", "");
        String senhaEnviada = loginRequest.getSenha().trim(); // <-- CORREÇÃO: Remove espaços do que foi enviado

        Optional<Cliente> clienteOpt = clienteRepository.findByCpf(cpfLimpo);

        if (clienteOpt.isEmpty()) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED) 
                                 .body(new LoginResponse("CPF ou senha inválidos", null));
        }

        Cliente cliente = clienteOpt.get();
        String senhaSalva = cliente.getSenha().trim(); // <-- CORREÇÃO: Remove espaços do que está no banco (se houver)

        // Verifica a Senha
        if (senhaEnviada.equals(senhaSalva)) { // <-- Compra strings limpas
            return ResponseEntity.ok(new LoginResponse("Login bem-sucedido!", cliente.getRole()));
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED) 
                                 .body(new LoginResponse("CPF ou senha inválidos", null));
        }
    }
} 