package projetosea.projeto_sea;

import org.springframework.web.bind.annotation.CrossOrigin; 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseStatus;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.GetMapping; // <-- NOVA IMPORTAÇÃO
import java.util.List; // <-- NOVA IMPORTAÇÃO

import jakarta.validation.Valid;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/api/clientes")
public class ClienteController {

    @Autowired
    private ClienteService clienteService;

    @PostMapping
    @ResponseStatus(HttpStatus.CREATED)
    public Cliente criar(@RequestBody @Valid Cliente cliente) {
        return clienteService.criarCliente(cliente);
    }
    
    // ==========================================================
    // MÉTODO NOVO: GET /api/clientes (PARA A TELA ADMIN)
    // ==========================================================
    @GetMapping
    public List<Cliente> listarTodos() {
        // Chama o service, que faz o "SELECT *"
        return clienteService.listarClientes();
    }
} 