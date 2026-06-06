package br.uesc.basta;

import org.springframework.web.bind.annotation.*;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@RestController
@SpringBootApplication
public class BastaApplication {
  @RequestMapping("/")
  String home() {
    return "Lar, doce lar";
  }

	public static void main(String[] args) {
    SpringApplication.run(BastaApplication.class, args);
	}
}
