# ProjetoPw

MEU DEUS PELO AMOR DE DEUS FUNCIONA

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
docker run --rm --name pw-mariadb -p 3306:3306 --env MARIADB_USER=root --env                          MARIADB_ROOT_PASSWORD=root --env MARIADB_DATABASE=basta mariadb:latest
```
