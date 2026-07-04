# BASTA

Projeto de Programação Web desenvolvido pelos integrantes:

- Erick Souza
- Arthur Araújo
- Stella Ribas
- Yohanan Santana

Link para o frontend: https://projeto-pw1.vercel.app/

## front-end

Para rodar o código do front-end:

```sh
npm install
ng serve
```

## back-end

Para rodar o código do back-end, localizado na pasta `spring`:

```sh
cd spring
./mvnw spring-boot:run # linux
mvnw spring-boot:run # windows
```

Para rodar o banco de dados (MySQL), uma alternativa é:

```sh
docker run --rm --name basta-mysql -e MYSQL_USER=root -e MYSQL_ROOT_PASSWORD=root -e MYSQL_DATABASE=basta mysql:9.7.1
```
