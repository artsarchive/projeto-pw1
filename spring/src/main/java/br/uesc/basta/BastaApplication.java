package br.uesc.basta;

import java.util.List;
import br.uesc.basta.model.*;
import org.springframework.web.bind.annotation.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

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

  @PostMapping("/")
  public Denuncia registrarDenuncia(@RequestBody Denuncia d) {
    return denunciaRepository.save(d);
  }
}
