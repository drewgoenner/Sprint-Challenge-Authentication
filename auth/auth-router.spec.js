const request = require('supertest');
const server = require('../api/server.js');

describe('Register', () => {
    const demoUser = {
        username:'drewgoenner',
        password:'test'
    }
    it('adds a new user and gets a 201', async () => {
       
        const res = await post('/api/auth/register', {'username': 'tester', 'password':'test'}).expect(201)
    })
    it('comes back with a 500 if password sent blank', async () => {
        const res = await post('/api/auth/register', {'username': 'tester2'}).expect(500)
    })
})

describe('Login', () => {
const user = {
    username: 'strider',
    password: 'woof'
}
    
    it('gives 401 with bad creds', async () => {
        const res = await post('/api/auth/login', {'username':'strider', 'password': 'wrong'}).expect(401);
        expect(user.password).toBe('woof')
    })

    it('gives server error with no creds', async () => {
        const res = await post('/api/auth/login').expect(500);
    })
})

function post(url, body){
    const httpRequest = request(server).post(url);
    httpRequest.send(body);
    httpRequest.set('Accept', 'application/json')
    httpRequest.set('Origin', 'http://localhost:3300')
    return httpRequest;
}