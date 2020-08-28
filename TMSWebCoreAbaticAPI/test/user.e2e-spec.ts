import { INestApplication } from '@nestjs/common';
import { Test, TestingModule } from '@nestjs/testing';
import { UserDto } from '../src/app/dto/users/user.dto';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { UserModule } from '../src/app/apprest.module';
import { TypeORMExceptionFilter } from '../src/config/filters/typeorm.exception.filter';
import { AuthModule } from '../src/auth/auth.module';
import { ConfigModule } from '@nestjs/config';

describe('UsersController (e2e)', () => {
  let app: INestApplication;
  
  beforeEach(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [ConfigModule, AppModule, UserModule, AuthModule],
    }).compile();
    app = moduleFixture.createNestApplication();
    app.useGlobalFilters(new TypeORMExceptionFilter());
    await app.init();
  });

  it('users CRUD', async (done) => {
    const server = request(app.getHttpServer());

    const newUser: UserDto = {
      name: 'Mateo',
      lastname: "Prueba",
      active: true,
      email:"pruebamateo@mateo.com",
      password: "PruebaMateo1"
    };

    const newUserRequest = await server.post('/users/appendUser').type('form')
      .send(newUser).expect(201);
    const id = newUserRequest.body.id;
        
    expect(newUserRequest.body.name).toBe(newUser.name);
    expect(newUserRequest.body.email).toBe(newUser.email);

    const signIn: { email: string, password: string} = {
      email: 'pruebamateo@mateo.com',
      password: 'PruebaMateo1'
    };

    const TokenRequest = await server.post('/auth/signin').type('form')
      .send(signIn).expect(201);

    const accessToken: string = TokenRequest.body.accessToken;    
    expect(accessToken.length).toBeGreaterThan(0);

    const currentGetAllRequest = await server.get('/users').expect(200).set('Authorization', 'Bearer '+accessToken);
    const currentSize = currentGetAllRequest.body.length;
    expect(currentSize).toBeGreaterThan(0);

    const getConflictInsert = await server.post('/users/appendUser').type('form')
      .send(newUser).expect(409);
    
    console.log(getConflictInsert);
    
    const getUserByIdRequest = await server.get(`/users/${id}`).expect(200).set('Authorization', 'Bearer '+accessToken);
    expect(getUserByIdRequest.body.id).toBe(id);

    const updateUser: UserDto = {
      name: 'Mateo Cambiado'
    };

    const updateUserRequest = await server.put(`/users/${getUserByIdRequest.body.id}`)
      .expect(200).type('form').send(updateUser).set('Authorization', 'Bearer '+accessToken);

    expect(updateUserRequest.body.name).toEqual(updateUser.name);
    expect(updateUserRequest.body.email).toEqual(newUser.email);

    await server.delete(`/users/${id}`).expect(200).set('Authorization', 'Bearer '+accessToken);
    
    done();

  });
});