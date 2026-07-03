package br.uesc.basta.model;

import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
public class Denuncia {
  @Id
  @GeneratedValue(strategy = GenerationType.AUTO)
  public Long id;

  public String nomeLocal;
  public Float latitude;
  public Float longitude;
  public String horaOcorrencia;
  public String tipoViolencia;
  public String pontoReferencia;

  @JsonFormat(pattern="yyyy-MM-dd")
  public LocalDate dataOcorrencia;
}
