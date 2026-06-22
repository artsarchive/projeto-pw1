package br.uesc.basta.model;

import java.util.Date;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;

@Entity
public class Denuncia {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  public Long id;

  public String endereco;
  public Float latitude;
  public Float longitude;
  public String hora_ocorrencia;
  public String tipo_violencia;
  public Date data;
}
