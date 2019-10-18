const db = require('../database/dbConfig.js');
const Auth = require('./auth-model.js');
const request = require('supertest');
const server = require('../api/server.js');

describe('users router', () => {

    beforeEach(async () => {
        await db('users').truncate();
    });

    it('should set test env', () => {
        expect(process.env.DB_ENV).toBe('testing')
    })

    it('should add a user to the database', async () => {
        const empty = await db('users');
        expect(empty).toHaveLength(0);

        await Auth.add({ username: 'drewgoenner', password: 'test'});
        const users = await db('users');

        expect(users).toHaveLength(1);
    })
})