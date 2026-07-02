# BASTA

Projeto de Web (TODO: qual o nome da disciplina mesmo) desenvolvido pelos integrantes:

- Erick Souza
- Arthur
- Stella Ribas
- Yohanan Santana

Estrutura geral do projeto:

## front-end

```sh
npm install
ng serve
```

## back-end

```sh
cd spring
./mvnw spring-boot:run # linux
mvnw spring-boot:run # windows
```

Para rodar o banco de dados (MariaDB, acho que é compatível com MySQL):

```sh
docker run --rm --name basta-mysql -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=basta mysql:9.7.1
```
