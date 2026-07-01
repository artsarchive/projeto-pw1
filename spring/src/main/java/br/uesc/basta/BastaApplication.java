package br.uesc.basta;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import br.uesc.basta.model.Denuncia;
import br.uesc.basta.model.DenunciaRepository;

@RestController
class MainController {
  @RequestMapping("/")
  String home() {
    return "Lar, doce lar";
  }
}

@SpringBootApplication
public class BastaApplication {
	public static void main(String[] args) {
    SpringApplication.run(BastaApplication.class, args);
	}
}

@RestController
@RequestMapping("/denuncias")
class DenunciasController {
  @Autowired
  private DenunciaRepository denunciaRepository;

  @GetMapping("/")
  public List<Denuncia> getDenuncias() {
    return (List<Denuncia>) denunciaRepository.findAll();
  }

  @GetMapping("/{id}")
  public Denuncia getDenunciaById(@PathVariable Long id) {
    return denunciaRepository.findById(id)
          .orElseThrow(() -> new RuntimeException("Denúncia não encontrada."));
  }

  @PostMapping("/")
  public Denuncia registrarDenuncia(@RequestBody Denuncia d) {
    return denunciaRepository.save(d);
  }

  @PutMapping("/{id}")
  public ResponseEntity<String> atualizarDenuncia(@PathVariable Long id) {
    return ResponseEntity
      .status(HttpStatus.METHOD_NOT_ALLOWED)
      .body("Este endpoint não está disponível para denúncias.");
  }

  @DeleteMapping("/{id}")
  public void deletarDenuncia(@PathVariable Long id) {
    denunciaRepository.deleteById(id);
  }
}
