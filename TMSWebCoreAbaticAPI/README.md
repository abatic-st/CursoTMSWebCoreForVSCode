<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo_text.svg" width="320" alt="Nest Logo" /></a>
</p>

# Base API

Base API for project development.  Made with the NestJS framework.

Remember that this development has been carried out from my point of view. The project may not match your needs, be free to modify what you need, but remember that it is already under your responsibility.

The code manages user data with the possibility of having user roles. It offers a REST and GraphQL solution, from this moment on you can choose to maintain both systems, or continue with the REST or GraphQL.

The project uses PostGreSQL as a database, in case you want another database engine you would have to adapt the API to your needs.

Once the data in the .env file is configured (as indicated), you can run the API in a Docker container.

You will find a directory called Postman, there is a file that you can import into the program.
The collection contains all calls to REST services and GraphQL. Remember that the API uses token authentication and the first thing you should use are the calls needed to create a user and login to get a token.

A section has not been created to create the structure of the database, but you will be able to find in a folder named postgre_schema an SQL file with enough sentences to create the necessary structure in the database that you indicate.

I would be grateful if you could comment on GitHub anything, always with respect, if the community could also contribute to improve the project, it would be great.

## NestJS Description

[Nest](https://github.com/nestjs/nest) framework TypeScript starter repository.
- Author - [Kamil Myśliwiec](https://twitter.com/kammysliwiec)
- Website - [https://nestjs.com](https://nestjs.com/)
- Twitter - [@nestframework](https://twitter.com/nestframework)

### License

Nest is [MIT licensed](https://github.com/nestjs/nest/blob/master/LICENSE).

## About me
- Author: Amador López Parra
- Enterprise: [Abatic Soluciones Tecnológicas](https://www.abatic.es)

## Installation

```bash
$ npm install --only=prod
$ npm install --only=dev
```

## Files Required

### ENV

- name 
  (.env)

- Contennt
  ```
  ORM_HOST = localhost
  ORM_PORT = 5432
  ORM_USERNAME = postgres
  ORM_PASSWORD = postgres
  ORM_DATABASE = postgres
  ORM_SYNCHRONIZE = true
  ORM_LOGGING = true
  ORM_SCHEMA = public
  JWT_SECRET = secretkey
  JWT_EXPIRE = expireseconds
  POSTGRES_PORT_EXTERNAL=5432
  NEST_EXTERNAL_PORT=3001
  ```

## Run and Stop the app

```bash

# Start DataBase Container
npm run db:up

# Second Run NestJS API
npm run start
  # Control + C to Cancel Running

# Stop Database Container
npm run db:down

```
