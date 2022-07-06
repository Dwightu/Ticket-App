import request from 'supertest'
import { app } from '../../app'


it('returns a 201 on successful signing out', async () => {
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(201);

    await request(app)
        .get('/api/users/signout')
        .send({
            email: 'test@test.com',
            password: 'password'
        })
        .expect(200)
})