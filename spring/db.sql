CREATE TABLE Denuncia (
  id int NOT NULL PRIMARY KEY AUTO_INCREMENT,
  endereco varchar(256) NOT NULL,
  latitude float,
  longitude float,
  hora_ocorrencia enum('manha', 'tarde', 'noite') NOT NULL,
  tipo_violencia enum(
    'trafico', 'sexual', 'feminicidio', 'agressao', 'psicologica', 'exploração',
    'machismo', 'assalto', 'insulto', 'desrespeito', 'injustica', 'indiferença'
  ) NOT NULL,
  data date NOT NULL
);

CREATE TABLE Feedback (
  id int NOT NULL PRIMARY KEY,
  tipo_feedback enum('melhoria', 'recurso', 'conteudo', 'outro') NOT NULL,
  nome varchar(128),
  email varchar(128),
  mensagem varchar(512) NOT NULL,
  data date NOT NULL
);
